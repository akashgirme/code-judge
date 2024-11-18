import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import { ProblemService } from '../../problem/services';
import {
  CreateSubmissionDto,
  CreateSubmissionResponseDto,
  RunStatusResponseDto,
  SubmissionResponse,
  SubmitStatusResponseDto,
} from '../dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SubmissionRequest, SubmissionResult, SubmissionState } from '@code-judge/common';
import { SubmissionType } from 'libs/common/src/enum/submission-type.enum';

@Injectable()
export class SubmissionService {
  private logger = new Logger(SubmissionService.name);
  constructor(
    @InjectRepository(Submission) private submissionRepo: Repository<Submission>,
    private readonly storageService: StorageService,
    private readonly problemService: ProblemService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('submission') private submissionQueue: Queue
  ) {}

  async createSubmission(
    user: User,
    { problemId, sourceCode, language }: CreateSubmissionDto
  ): Promise<CreateSubmissionResponseDto> {
    const problem = await this.problemService.getProblemByID(problemId);

    const submissionKey = uuidv4();
    const submissionDateTime = new Date();

    /**
     * For Submission `actual test cases` are used
     */
    const testCases = problem.actualTestCases.map(({ input, output }) => ({
      input,
      output,
    }));

    const submissionObj: SubmissionRequest = {
      id: submissionKey,
      type: SubmissionType.SUBMIT,
      userId: user.id,
      problemId: problem.id,
      sourceCode: sourceCode,
      language: language,
      testCases: testCases,
      createdAt: submissionDateTime,
      state: SubmissionState.PENDING,
    };

    try {
      await this.cacheManager.set(`submission:${submissionKey}`, submissionObj);
    } catch (error) {
      this.logger.error(`Failed to store submission object in cache: ${error}`);
      throw new InternalServerErrorException('Internal Server Error');
    }

    try {
      await this.submissionQueue.add(`submission:${submissionKey}`, submissionKey, {});
    } catch (error) {
      this.logger.error(`Failed to queue the submission: ${error}`);
      throw new InternalServerErrorException('Internal Server Error');
    }

    return { id: submissionKey };
  }

  async createRun(
    user: User,
    { problemId, sourceCode, language }: CreateSubmissionDto
  ): Promise<CreateSubmissionResponseDto> {
    const problem = await this.problemService.getProblemByID(problemId);

    const submissionKey = uuidv4();
    const submissionDateTime = new Date();

    /**
     * For Run `example test cases` are used
     */
    const testCases = problem.exampleTestCases.map(({ input, output }) => ({
      input,
      output,
    }));

    const submissionObj: SubmissionRequest = {
      id: submissionKey,
      type: SubmissionType.RUN,
      userId: user.id,
      problemId: problem.id,
      sourceCode: sourceCode,
      language: language,
      testCases: testCases,
      createdAt: submissionDateTime,
      state: SubmissionState.PENDING,
    };

    try {
      await this.cacheManager.set(`submission:${submissionKey}`, submissionObj);
    } catch (error) {
      this.logger.error(`Failed to store submission object in cache: ${error}`);
      throw new InternalServerErrorException('Internal Server Error');
    }

    try {
      await this.submissionQueue.add(`submission:${submissionKey}`, submissionKey, {});
    } catch (error) {
      this.logger.error(`Failed to queue the submission: ${error}`);
      throw new InternalServerErrorException('Internal Server Error');
    }

    return { id: submissionKey };
  }

  async createDBEntry(submissionKey: string): Promise<Submission> {
    const submissionResult: SubmissionResult = await this.cacheManager.get(
      `submission:${submissionKey}`
    );

    /**
     * If type is SubmissionType.RUN then don't need to save submission in database
     * return
     */

    if (submissionResult.type == SubmissionType.RUN) {
      return;
    }

    const problem = await this.problemService.getProblemByID(submissionResult.problemId);

    const commonPath = `submissions/${problem.slug}/${submissionResult.language}/${submissionResult.userId}`;

    const sourceCodePath = `${commonPath}/sourceCode/source-code-${Date.now()}.txt`;

    const stderrPath = `${commonPath}/stederr/stderr-${Date.now()}.txt`;

    await Promise.all([
      this.storageService.putObject(sourceCodePath, submissionResult.sourceCode),
      this.storageService.putObject(stderrPath, submissionResult.stderr ?? ''),
    ]);

    const submissionObj = this.submissionRepo.create({
      sourceCodePath: sourceCodePath,
      language: submissionResult.language,
      user: { id: submissionResult.userId },
      problem: { id: submissionResult.problemId },
      status: submissionResult.status,
      stderrPath: stderrPath,
      testCasesPassed: submissionResult.passedTestCases,
      totalTestCases: submissionResult.totalTestCases,
      time: submissionResult?.time,
      memory: submissionResult?.memory,
      createdAt: submissionResult.createdAt,
    });

    const submission = await this.submissionRepo.save(submissionObj);

    return submission;
  }

  async getRunStatus(id: string): Promise<RunStatusResponseDto> {
    const submissionResult: SubmissionResult = await this.cacheManager.get(
      `submission:${id}`
    );

    const {
      sourceCode,
      language,
      state,
      status,
      result,
      passedTestCases,
      totalTestCases,
      stderr,
    } = submissionResult;

    return {
      sourceCode,
      language,
      status,
      state,
      result,
      passed: passedTestCases,
      total: totalTestCases,
      error: stderr,
    };
  }

  async getSubmitStatus(id: string): Promise<SubmitStatusResponseDto> {
    const submissionResult: SubmissionResult = await this.cacheManager.get(
      `submission:${id}`
    );

    const {
      sourceCode,
      language,
      state,
      status,
      passedTestCases,
      totalTestCases,
      createdAt,
      stderr,
      memory,
      time,
    } = submissionResult;

    return {
      sourceCode,
      language,
      state,
      status,
      passed: passedTestCases,
      total: totalTestCases,
      error: stderr,
      memory,
      time,
      createdAt,
    };
  }

  async getSubmissionsByProblem(user: User, problemId: number): Promise<Submission[]> {
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

  async getSubmission(user: User, submissionId: number): Promise<SubmissionResponse> {
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
    const sourceCode = await this.storageService.getObject(submission.sourceCodePath);
    const error = await this.storageService.getObject(submission.stderrPath);

    return { ...submission, sourceCode, error };
  }
}
