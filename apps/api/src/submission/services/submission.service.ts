import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import { AllSubmissionsDto, CreateSubmissionDto } from '../dto';
import { SubmissionStatus } from '../enums';
import { getPaginationMeta } from '../../common/utility';
import { SubmissionsQueryDto } from '../dto/submissions-query.dto';
import { SortOrder } from '../../common/types';
import { ExecutionService } from '../../execution/services';
import { UpdateSubmission } from '../types';

@Injectable()
export class SubmissionService {
  private logger = new Logger(SubmissionService.name);
  constructor(
    @InjectRepository(Submission) private submissionRepo: Repository<Submission>,
    private readonly storageService: StorageService,
    @Inject(forwardRef(() => ExecutionService))
    private readonly executionService: ExecutionService
  ) {}

  async createSubmission(user: User, { problemId, code, language }: CreateSubmissionDto) {
    const submissionSlug = `submissions/${
      user.id
    }/${problemId}/${Date.now()}.${language}`;
    await this.storageService.putObject(submissionSlug, code);

    const submissionObj = this.submissionRepo.create({
      slug: submissionSlug,
      language,
      user,
      status: SubmissionStatus.PENDING,
      problem: { id: problemId },
    });

    const submission = await this.submissionRepo.save(submissionObj);

    this.logger.log('Submission created with id: ', submission.id);

    /**
     * Send submission for execution.
     */
    await this.executionService.executeSubmission(problemId, submission.id);

    this.logger.log('Code excution request send for submission: ', submission.id);

    return submission;
  }

  async updateSubmission({
    submissionId,
    totalTestCases,
    testCasesPassed,
    stderr,
  }: UpdateSubmission) {
    const submission = await this.getSubmissionById(submissionId);

    this.logger.log('Standard Error occured: ', stderr);

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
}
