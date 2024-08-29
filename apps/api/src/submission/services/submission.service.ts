import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import { UpdateSubmission } from '../types';
import { ProblemService } from '../../problem/services';
import { CreateSubmissionDto, SubmissionDto } from '../dto';
import { plainToClass } from 'class-transformer';
import { ExecutionService } from '../../execution/services';

@Injectable()
export class SubmissionService {
  private logger = new Logger(SubmissionService.name);
  constructor(
    @InjectRepository(Submission) private submissionRepo: Repository<Submission>,
    private readonly storageService: StorageService,
    private readonly problemService: ProblemService,
    private readonly executionService: ExecutionService
  ) {}

  async createSubmission(user: User, { problemId, code, language }: CreateSubmissionDto) {
    const problem = await this.problemService.findProblemById(problemId);
    const path = `submissions/${problem.slug}/${language}/${
      user.id
    }/solution-${Date.now()}.txt`;
    await this.storageService.putObject(path, code);

    const submissionObj = this.submissionRepo.create({
      path,
      language,
      user,
      problem,
    });

    const submission = await this.submissionRepo.save(submissionObj);

    this.logger.log('Submission created with id: ', submission.id);

    await this.executionService.executeSubmission(problem, submission);

    this.logger.log('Code excution request send for submission: ', submission.id);

    return submission;
  }

  async updateSubmission({
    submissionId,
    totalTestCases,
    testCasesPassed,
    statusMessage,
    state,
    stderr,
    time,
    memory,
    finished,
  }: UpdateSubmission) {
    const submission = await this.getSubmissionById(submissionId);

    submission.state = state;
    submission.statusMessage = statusMessage;
    submission.totalTestCases = totalTestCases;
    submission.testCasesPassed = testCasesPassed;
    submission.time = time;
    submission.memory = memory;
    submission.finished = finished;

    if (stderr) {
      const stderrPath = `submissions/stderr/${submission.id}/stderr.txt`;
      await this.storageService.putObject(stderrPath, stderr);
      submission.stderrPath = stderrPath;
    }

    const updatedSubmission = await this.submissionRepo.save(submission);

    this.logger.log('Submission state updated', `state: ${state}`);

    return updatedSubmission;
  }

  async getSubmissionsByProblemAndUser(
    user: User,
    problemId: number
  ): Promise<Submission[]> {
    const submissions = await this.submissionRepo
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.user', 'user')
      .leftJoinAndSelect('submission.problem', 'problem')
      .select(['submission'])
      .where('user.id = :userId', { userId: user.id })
      .andWhere('problem.id = :problemId', { problemId })
      .orderBy('submission.createdAt', 'DESC')
      .getMany();

    return submissions;
  }

  async getSubmission(user: User, submissionId: number): Promise<SubmissionDto> {
    const submission = await this.submissionRepo
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.user', 'user')
      .select(['submission', 'user.id', 'user.firstName', 'user.lastName'])
      .where('submission.id = :submissionId', { submissionId })
      .getOne();

    if (submission.user.id !== user.id) {
      throw new ForbiddenException(
        `You don't have permission to read this submission: '${submissionId}'`
      );
    }
    const code = await this.storageService.getObject(submission.path);
    let stderr = '';
    if (submission.stderrPath) {
      stderr = await this.storageService.getObject(submission.stderrPath);
    }
    return plainToClass(SubmissionDto, { ...submission, code, stderr });
  }

  async getSubmissionById(id: number) {
    const submission = await this.submissionRepo.findOneBy({ id });

    if (!submission) {
      throw new NotFoundException(`Submission with id '${id}' not found`);
    }

    return submission;
  }
}
