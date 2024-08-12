import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../entities';
import { Repository } from 'typeorm';
import {
  ChangeProblemStatusDto,
  CreateProblemDto,
  ProblemResponseAdminDto,
  ProblemsQueryDto,
  ProblemsResponseDto,
  UpdateProblemDto,
} from '../dto';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { TopicService } from './topic.service';
import { TestCaseService } from './testcase.service';
import { getPaginationMeta } from '../../common/utility';
import { ProblemStatus } from '../enums';
import { AbilityFactory, Action } from '../../ability/ability.factory';
import { SortOrder } from '../../common/types';
import { SolutionService } from '../../solution/services';
import { ExecutionService } from '../../execution/services';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem) private problemRepo: Repository<Problem>,
    private readonly storageService: StorageService,
    private readonly topicService: TopicService,
    private readonly testCaseService: TestCaseService,
    private readonly solutionService: SolutionService,
    private abilityFactory: AbilityFactory,
    private readonly executionService: ExecutionService
  ) {}

  async createProblem(
    user: User,
    {
      title,
      difficulty,
      description,
      primarySolution,
      primarySolutionLanguage,
      testCasesInput,
      testCasesOutput,
      internalNotes,
      topicIds,
    }: CreateProblemDto
  ) {
    const { topics } = await this.topicService.findTopics(topicIds);

    const slug = `${this.convertTitletoSlug(title)}-${
      Math.floor(Math.random() * 10) + 1
    }`;

    await Promise.all([
      this.storageService.putObject(`problems/${slug}/description.md`, description),
      this.solutionService.saveSolution(slug, primarySolution, primarySolutionLanguage),
      this.testCaseService.saveTestCases(slug, testCasesInput, testCasesOutput),
    ]);

    const problemObj = this.problemRepo.create({
      title,
      difficulty,
      slug,
      topics,
      author: user,
      internalNotes,
      primarySolutionLanguage,
      isVerified: false,
    });

    const problem = await this.problemRepo.save(problemObj);

    // Send request to verify problem solution and testcases
    await this.executionService.execute({ problemId: problem.id });

    return problem;
  }

  async updateProblem(
    user: User,
    problemId: string,
    {
      title,
      difficulty,
      description,
      primarySolution,
      primarySolutionLanguage,
      testCasesInput,
      testCasesOutput,
      internalNotes,
      topicIds,
    }: UpdateProblemDto
  ) {
    const ability = this.abilityFactory.defineAbilityForUser(user);
    const { topics } = await this.topicService.findTopics(topicIds);

    const problem = await this.getProblemById(problemId);

    // If user doesn't have access to update problem & is trying to update a different persons problem
    if (!ability.can(Action.Update, Problem) && problem.author.id !== user.id) {
      throw new ForbiddenException(
        'Permission Error',
        `You do not have permission edit this problem '${problemId}'`
      );
    }

    // Store/update the problem description in object store (S3 Bucket).
    if (description) {
      await this.storageService.putObject(
        `problems/${problem.slug}/description.md`,
        description
      );
    }

    // Store/update the solution provided by user in object store (S3 Bucket).
    if (primarySolution && primarySolutionLanguage) {
      await this.solutionService.saveSolution(
        problem.slug,
        primarySolution,
        primarySolutionLanguage
      );
    }

    // Store/update the testcases in object store (S3 Bucket).
    if (testCasesInput && testCasesOutput) {
      await this.testCaseService.saveTestCases(
        testCasesInput,
        testCasesOutput,
        problem.slug
      );
    }

    Object.assign(problem, {
      title,
      difficulty,
      topics,
      primarySolutionLanguage,
      internalNotes,
      isVerified: false,
      status: ProblemStatus.UNPUBLISHED,
    });

    return this.problemRepo.save(problem);
  }

  async getProblem(problemId: string) {
    const problem = await this.getProblemById(problemId);
    const { slug } = problem;

    const description = await this.storageService.getObject(
      `problems/${slug}/description.md`
    );

    return { ...problem, description };
  }

  async getProblemForAdmin(problemId: string): Promise<ProblemResponseAdminDto> {
    const problem = await this.getProblemById(problemId);

    const { slug, primarySolutionLanguage } = problem;
    const [primarySolution, description, testCasesInput, testCasesOutput] =
      await Promise.all([
        this.solutionService.getSolutionAddedAsProblemSolution(
          slug,
          primarySolutionLanguage
        ),
        this.storageService.getObject(`problems/${slug}/description.md`),
        this.testCaseService.getTestCasesInput(slug),
        this.testCaseService.getExpectedOutput(slug),
      ]);

    return { ...problem, description, primarySolution, testCasesInput, testCasesOutput };
  }

  getProblemsForPublic(body: ProblemsQueryDto) {
    return this.getAllProblems(body);
  }

  getProblemsForAdmin(user: User, body: ProblemsQueryDto) {
    return this.getAllProblems(body, user);
  }

  async getAllProblems(
    body: ProblemsQueryDto,
    user?: User
  ): Promise<ProblemsResponseDto> {
    const { pageIndex = 0, pageSize = 10 } = body;
    const query = this.problemRepo
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.author', 'author')
      .leftJoinAndSelect('problem.topics', 'topic')
      .select([
        'problem.id',
        'problem.title',
        'problem.difficulty',
        'problem.slug',
        'problem.createdAt',
        'problem.updatedAt',
        'author.id',
        'author.firstName',
        'author.lastName',
        'topic.id',
        'topic.name',
      ])
      .take(pageSize)
      .skip(pageSize * pageIndex);

    // Common filters
    if (body.order) {
      query.orderBy('problem.updatedAt', body.order);
    } else {
      query.orderBy('problem.updatedAt', SortOrder.DESC);
    }

    if (body.difficulty) {
      // add difficulty filter
    }

    if (body.status) {
      query.andWhere('status = :status', { status: body.status });
    }

    if (body.title) {
      query.where('problem.title ILIKE :title', { title: `%${body.title}%` });
    }

    if (body.authorId) {
      query.andWhere('author.id = :authorId', {
        authorId: body.authorId,
      });
    }

    if (body.topicIds && body.topicIds.length > 0) {
      query.andWhere('filterTopics.id IN (:...topicIds)', {
        topicIds: body.topicIds,
      });
    }

    if (!user) {
      query.andWhere('status = :status', { status: ProblemStatus.APPROVED });
    } else {
      const ability = this.abilityFactory.defineAbilityForUser(user);
      if (ability.can(Action.Manage, Problem)) {
        // No additional filters for problem admin
      } else if (ability.can(Action.ReadOwn, Problem)) {
        query.andWhere('author.id = :authorId', {
          authorId: user.id,
        });
      }
    }

    const [problems, totalItems] = await query.getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: problems.length }
    );

    return { problems, paginationMeta };
  }

  async getProblemById(problemId: string): Promise<Problem> {
    const problem = await this.problemRepo
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.author', 'author')
      .leftJoinAndSelect('problem.topics', 'topic')
      .select([
        'problem',
        'author.id',
        'author.firstName',
        'author.lastName',
        'topic.id',
        'topic.name',
      ])
      .where('problem.id = :problemId', { problemId })
      .getOne();

    if (!problem) {
      throw new NotFoundException(
        'Problem not found',
        `Problem with id '${problemId}' not found`
      );
    }

    return problem;
  }

  async setVerified(problemId: string): Promise<void> {
    const problem = await this.getProblemById(problemId);
    problem.isVerified = true;

    await this.problemRepo.save(problem);
  }

  async changeProblemStatus({ problemId, status }: ChangeProblemStatusDto) {
    const problem = await this.getProblemById(problemId);

    problem.status = status;

    return this.problemRepo.save(problem);
  }

  private convertTitletoSlug(title: string) {
    return title.toLowerCase().replace(/\s/g, '-');
  }
}
