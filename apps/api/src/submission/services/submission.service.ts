import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import { UpdateSubmission } from '../types';
import { ProblemService } from '../../problem/services';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateSubmissionDto, SubmissionDto } from '../dto';
import { plainToClass } from 'class-transformer';

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

  async getSubmission(submissionId: number): Promise<SubmissionDto> {
    const submission = await this.getSubmissionById(submissionId);
    const code = await this.storageService.getObject(submission.path);
    return plainToClass(SubmissionDto, { ...submission, code });
  }

  async getSubmissionById(id: number) {
    const submission = await this.submissionRepo.findOneBy({ id });

    if (!submission) {
      throw new NotFoundException(
        'Submission not found',
        `Submission with id ${id} not found`
      );
    }

    return submission;
  }
}
