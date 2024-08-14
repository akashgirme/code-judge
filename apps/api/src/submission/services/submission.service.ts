import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import { AllSubmissionsDto, CreateSubmissionDto } from '../dto';
import { SubmissionState } from '../enums';
import { getPaginationMeta } from '../../common/utility';
import { SubmissionsQueryDto } from '../dto/submissions-query.dto';
import { SortOrder } from '../../common/types';
import { UpdateSubmission } from '../types';
import { ProblemService } from '../../problem/services';
import { StatusMessage } from '@code-judge/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class SubmissionService {
  private logger = new Logger(SubmissionService.name);
  constructor(
    @InjectRepository(Submission) private submissionRepo: Repository<Submission>,
    private readonly storageService: StorageService,
    private readonly problemService: ProblemService,
    @InjectQueue('CODE_EXECUTION') private executionQueue: Queue
  ) {}

  async createSubmission(user: User, { problemId, code, language }: CreateSubmissionDto) {
    const problem = await this.problemService.getProblemById(problemId);
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

    /**
     * Add submission in Queue for execution.
     */
    await this.executionQueue.add('execute', {
      payload: { problemId, submissionId: submission.id },
    });

    this.logger.log('Code excution request send for submission: ', submission.id);

    return submission;
  }

  async updateSubmission({
    submissionId,
    totalTestCases,
    testCasesPassed,
    statusMessage,
    state,
    finished,
  }: UpdateSubmission) {
    const submission = await this.getSubmissionById(submissionId);

    submission.state = state;
    submission.statusMessage = statusMessage;
    submission.totalTestCases = totalTestCases;
    submission.testCasesPassed = testCasesPassed;
    submission.finished = finished;

    const updatedSubmission = await this.submissionRepo.save(submission);

    this.logger.log('Submission Updated');

    return updatedSubmission;
  }

  async getSubmissionsByProblem(
    problemId: number,
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
    problemId: number
  ): Promise<Submission[]> {
    const submissions = await this.submissionRepo
      .createQueryBuilder('submission')
      .where('submission.user = :userId', { userId: user.id })
      .andWhere('submission.problem = :problemId', { problemId })
      .orderBy('submission.createdAt', 'DESC')
      .getMany();

    return submissions;
  }

  async getSubmissionById(id: number) {
    const submission = await this.submissionRepo.findOneBy({ id });

    if (!submission) {
      throw new NotFoundException(
        'Submission not found',
        `Submission with id ${id} not found`
      );
    }

    const code = await this.storageService.getObject(submission.path);

    return { ...submission, code };
  }
}
