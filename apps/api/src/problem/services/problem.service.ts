import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../entities';
import { Repository } from 'typeorm';
import {
  CreateProblemDto,
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

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem) private problemRepo: Repository<Problem>,
    private readonly storageService: StorageService,
    private readonly topicService: TopicService,
    private readonly testCaseService: TestCaseService,
    private abilityFactory: AbilityFactory
  ) {}

  async createProblem(
    user: User,
    {
      title,
      difficulty,
      description,
      solution,
      solutionLanguage,
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
      this.storageService.putObject(
        `problems/${slug}/solutions/solution.${solutionLanguage}`,
        solution
      ),
      this.testCaseService.saveTestCases(testCasesInput, testCasesOutput, slug),
    ]);

    const problem = this.problemRepo.create({
      title,
      difficulty,
      slug,
      topics,
      author: user,
      internalNotes,
    });
    return this.problemRepo.save(problem);
  }

  async updateProblem(
    user: User,
    problemId: string,
    {
      title,
      difficulty,
      description,
      solution,
      solutionLanguage,
      testCasesInput,
      testCasesOutput,
      internalNotes,
      topicIds,
      status,
    }: UpdateProblemDto
  ) {
    const ability = this.abilityFactory.defineAbilityForUser(user);
    const { topics } = await this.topicService.findTopics(topicIds);

    const problem = await this.getProblemById(problemId);

    // If user doesn't have access to update problem & is trying to update a different persons problem
    if (!ability.can(Action.Update, Problem) && problem.author.id !== user.id) {
      throw new ForbiddenException(
        'Permission Error',
        `You do not have permission edit problem '${problemId}'`
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
    if (solution && solutionLanguage) {
      await this.storageService.putObject(
        `problems/${problem.slug}/solutions/solution.${solutionLanguage}`,
        solution
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
      internalNotes,
    });

    if (ability.can(Action.Publish, Problem)) {
      if (status) {
        problem.status = status;
      }
    } else {
      problem.status = ProblemStatus.UNPUBLISHED;
    }

    return this.problemRepo.save(problem);
  }

  getProblemForPublic(body: ProblemsQueryDto) {
    return this.getAllProblems(body);
  }

  getProblemForAdmin(user: User, body: ProblemsQueryDto) {
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

  async getProblemById(problemId: string) {
    const problem = await this.problemRepo
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.author', 'author')
      .leftJoinAndSelect('problem.topics', 'topic')
      .select([
        'problem.id',
        'problem.title',
        'problem.difficulty',
        'problem.slug',
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

    const description = await this.storageService.getObject(
      `problems/${problem.slug}/description.md`
    );

    return { ...problem, description };
  }

  private convertTitletoSlug(title: string) {
    return title.toLowerCase().replace(/\s/g, '-');
  }
}
