import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import {
  CreateSubmissionDto,
  SendCodeToExecutionServerDto,
  UpdateSubmissionDto,
} from '../dto';
import { ProblemService } from '../../problem/services';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SubmissionStatus } from '../enums';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission) private submissionRepo: Repository<Submission>,
    private readonly storageService: StorageService,
    private readonly problemService: ProblemService,
    private readonly configService: ConfigService,
    private readonly HttpService: HttpService
  ) {}

  async createSubmission(user: User, { problemId, code, language }: CreateSubmissionDto) {
    const submissionSlug = `submissions/${
      user.id
    }/${problemId}/${Date.now()}.${language}`;
    await this.storageService.putObject(submissionSlug, code);

    const submission = this.submissionRepo.create({
      slug: submissionSlug,
      language,
      user,
      status: SubmissionStatus.PENDING,
      problem: { id: problemId },
    });

    return this.submissionRepo.save(submission);
  }

  async updateSubmissionResult({
    submissionId,
    totalTestCases,
    testCasesPassed,
  }: UpdateSubmissionDto) {
    const submission = await this.findSubmissionById(submissionId);

    const status =
      totalTestCases === testCasesPassed
        ? SubmissionStatus.ACCEPTED
        : SubmissionStatus.FAILED;

    submission.status = status;
    submission.totalTestCases = totalTestCases;
    submission.testCasesPassed = testCasesPassed;

    return this.submissionRepo.save(submission);
  }

  async getSubmissionsByProblemAndUser(user: User, problemId: string) {
    const submissions = await this.submissionRepo
      .createQueryBuilder('submission')
      .where('submission.user = :userId', { userId: user.id })
      .andWhere('submission.problem = :problemId', { problemId })
      .orderBy('submission.createdAt', 'DESC')
      .getMany();

    return submissions;
  }

  async findSubmissionById(id: string) {
    const submission = await this.submissionRepo.findOneBy({ id });

    if (!submission) {
      throw new NotFoundException(
        'Submission not found',
        `Submission with id ${id} not found`
      );
    }

    const code = await this.storageService.getObject(submission.slug);

    return { ...submission, code };
  }

  async sendCodeToExecutionServer({
    submissionId,
    problemId,
    sourceCodeSlug,
    language,
  }: SendCodeToExecutionServerDto): Promise<void> {
    const { slug } = await this.problemService.getProblemById(problemId);

    const inputTestCasesSlug = `problems/${slug}/testcases/input.txt`;
    const expectedOutputSlug = `problems/${slug}/testcases/output.txt`;

    const executionServerUrl = `${this.configService.get<string>(
      'CODE_EXECUTION_SERVER_URL'
    )}/api/submissions`;

    try {
      await firstValueFrom(
        this.HttpService.post(executionServerUrl, {
          submissionId,
          sourceCodeSlug,
          inputTestCasesSlug,
          expectedOutputSlug,
          language,
        })
      );
    } catch (error) {
      if (error.response) {
        // Axios error with response
        throw new InternalServerErrorException(
          'Execution server error',
          `${error.response.data.message}`
        );
      } else {
        // Axios error without response
        throw new ServiceUnavailableException(
          'Failed to communicate with execution server'
        );
      }
    }
  }
}
