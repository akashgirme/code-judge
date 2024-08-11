import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import {
  AllSubmissionsDto,
  CreateSubmissionDto,
  ExecutionRequestDto,
  UpdateSubmissionDto,
} from '../dto';
import { ProblemService } from '../../problem/services';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SubmissionStatus } from '../enums';
import { getPaginationMeta } from '../../common/utility';
import { SubmissionsQueryDto } from '../dto/submissions-query.dto';
import { SortOrder } from '../../common/types';

@Injectable()
export class SubmissionService {
  private logger = new Logger(SubmissionService.name);
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
    id,
    totalTestCases,
    testCasesPassed,
  }: UpdateSubmissionDto) {
    const submission = await this.getSubmissionById(id);

    const status =
      totalTestCases === testCasesPassed
        ? SubmissionStatus.ACCEPTED
        : SubmissionStatus.FAILED;

    submission.status = status;
    submission.totalTestCases = totalTestCases;
    submission.testCasesPassed = testCasesPassed;

    const updatedSubmission = await this.submissionRepo.save(submission);

    this.logger.log('Submission Updated');

    return updatedSubmission;
  }

  async getSubmissionsByProblem(
    problemId: string,
    body: SubmissionsQueryDto
  ): Promise<AllSubmissionsDto> {
    const { pageIndex = 0, pageSize = 10 } = body;

    const query = this.submissionRepo
      .createQueryBuilder('submission')
      .where('submission.problem = :problemId', { problemId })
      .orderBy('submission.createdAt', 'DESC')
      .skip(pageIndex * pageSize)
      .take(pageSize);

    if (body.language) {
      query.andWhere('submission.language =:language', { language: body.language });
    }

    if (body.order) {
      query.orderBy('submission.updatedAt', body.order);
    } else {
      query.orderBy('submission.updatedAt', SortOrder.DESC);
    }

    const [submissions, totalItems] = await query.getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: submissions.length }
    );

    return { submissions, paginationMeta };
  }

  async getSubmissionsByProblemAndUser(
    user: User,
    problemId: string
  ): Promise<Submission[]> {
    const submissions = await this.submissionRepo
      .createQueryBuilder('submission')
      .where('submission.user = :userId', { userId: user.id })
      .andWhere('submission.problem = :problemId', { problemId })
      .orderBy('submission.createdAt', 'DESC')
      .getMany();

    return submissions;
  }

  async getSubmissionById(id: string) {
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

  async sendExecutionRequest({
    id,
    problemId,
    sourceCode,
    language,
  }: ExecutionRequestDto): Promise<void> {
    const { slug } = await this.problemService.getProblemById(problemId);

    const inputTestCases = await this.storageService.getObject(
      `problems/${slug}/testcases/input.txt`
    );
    const expectedOutput = await this.storageService.getObject(
      `problems/${slug}/testcases/output.txt`
    );

    const executionServerUrl = `${this.configService.get<string>(
      'CODE_EXECUTION_SERVER_URL'
    )}/api/submissions`;

    try {
      await firstValueFrom(
        this.HttpService.post(executionServerUrl, {
          id,
          sourceCode,
          inputTestCases,
          expectedOutput,
          language,
        })
      );

      this.logger.log('Execution Request Send ', id);
    } catch (error) {
      if (error.response) {
        // Axios error with response
        this.logger.error('Execution server responded with error', error.response.data);
        throw new InternalServerErrorException(
          'Execution server error',
          `${error.response.data.message}`
        );
      } else {
        // Axios error without response
        this.logger.error("Execution server didn't response");
        throw new ServiceUnavailableException(
          'Failed to communicate with execution server'
        );
      }
    }
  }
}
