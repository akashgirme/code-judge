import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../entities';
import { Repository } from 'typeorm';
import { AllProblemsDto, CreateProblemDto, ProblemsQueryDto, TestCaseDto } from '../dto';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { TagService } from './topic.service';
import { TestCaseService } from './testcase.service';
import { getPaginationMeta } from '../../common/utility';
import { ProblemStatus, TestCaseType } from '../enums';
import { AbilityFactory, Action } from '../../ability/ability.factory';
import { SortOrder } from '../../common/types';

@Injectable()
export class ProblemService {
  private logger = new Logger(ProblemService.name);
  constructor(
    @InjectRepository(Problem) private problemRepo: Repository<Problem>,
    private readonly storageService: StorageService,
    private readonly tagService: TagService,
    private readonly testCaseService: TestCaseService,
    private abilityFactory: AbilityFactory
  ) {}

  async createProblem(
    user: User,
    {
      title,
      difficulty,
      description,
      tagIds,
      exampleTestCases,
      actualTestCases,
    }: CreateProblemDto
  ): Promise<Problem> {
    const { tags } = await this.tagService.findTags(tagIds);
    const slug = `${this.convertTitletoSlug(title)}-${
      Math.floor(Math.random() * 90) + 10
    }}`;
    const descriptionPath = `problems/${slug}/description.md`;

    try {
      await this.storageService.putObject(descriptionPath, description);
    } catch (error) {
      this.logger.log('Error while saving description of problem', error);
      throw new InternalServerErrorException();
    }

    /**
     * Start transaction to save problem and test cases
     */
    const queryRunner = this.problemRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let problemId: number;

    try {
      const newProblem = this.problemRepo.create({
        title,
        difficulty,
        slug,
        descriptionPath,
        tags,
        author: user,
        status: ProblemStatus.UNPUBLISHED,
      });

      const problem = await queryRunner.manager.save(newProblem);
      problemId = problem.id;

      // Save example testcases
      await Promise.all(
        exampleTestCases.map(async (testCase: TestCaseDto) => {
          return this.testCaseService.createTestCase(
            queryRunner,
            problem,
            TestCaseType.EXAMPLE,
            {
              ...testCase,
            }
          );
        })
      );

      // Save example testcases
      await Promise.all(
        actualTestCases.map(async (testCase: TestCaseDto) => {
          return this.testCaseService.createTestCase(
            queryRunner,
            problem,
            TestCaseType.ACTUAL,
            {
              ...testCase,
            }
          );
        })
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw err;
    }
    await queryRunner.release();

    return this.getProblemByID(problemId);
  }

  async updateProblem(
    user: User,
    problemId: number,
    {
      title,
      difficulty,
      description,
      internalNotes,
      tagIds,
      status,
      exampleTestCases,
      actualTestCases,
    }: CreateProblemDto
  ): Promise<Problem> {
    const ability = this.abilityFactory.defineAbilityForUser(user);
    const problem = await this.getProblemByID(problemId);

    // If user doesn't have access to update problem & is trying to update a different person blog post
    if (!ability.can(Action.UpdateOwn, Problem) && problem.author.id !== user.id) {
      throw new ForbiddenException('You do not have permission to edit this problem');
    }

    const { tags } = await this.tagService.findTags(tagIds);

    try {
      await this.storageService.putObject(problem.descriptionPath, description);
    } catch (error) {
      this.logger.log('Error while saving description of problem', error);
      throw new InternalServerErrorException();
    }

    /**
     * Start transaction to update problem and test cases
     */
    const queryRunner = this.problemRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const updatedProblem = queryRunner.manager.create(Problem, {
      ...problem,
      title,
      difficulty,
      tags,
      internalNotes,
    });

    // If user has does not have ability to change problem status,
    // Status is set to `unpublished` by default
    if (ability.can(Action.Publish, Problem)) {
      if (status) {
        updatedProblem.status = status;
      }
    } else {
      updatedProblem.status = ProblemStatus.UNPUBLISHED;
    }

    try {
      await queryRunner.manager.save(updatedProblem);

      // Fetch the existing test cases
      const existingExampleTestCases = await this.testCaseService.getExampleTestCases(
        updatedProblem.id
      );

      const existingActualTestCases = await this.testCaseService.getActualTestCases(
        updatedProblem.id
      );

      // Delete all existing example test cases
      if (existingExampleTestCases.length != 0) {
        await Promise.all(
          existingExampleTestCases.map(
            async (testcase) =>
              await this.testCaseService.deleteTestCase(queryRunner, testcase.id)
          )
        );
      }

      // Delete all existing actual test cases
      if (existingActualTestCases.length != 0) {
        await Promise.all(
          existingActualTestCases.map(
            async (testcase) =>
              await this.testCaseService.deleteTestCase(queryRunner, testcase.id)
          )
        );
      }

      // Add new edited example test cases
      await Promise.all(
        exampleTestCases.map(async (testCase: TestCaseDto) => {
          return this.testCaseService.createTestCase(
            queryRunner,
            updatedProblem,
            TestCaseType.EXAMPLE,
            {
              ...testCase,
            }
          );
        })
      );

      // Add new edited actual test cases
      await Promise.all(
        actualTestCases.map(async (testCase: TestCaseDto) => {
          return this.testCaseService.createTestCase(
            queryRunner,
            updatedProblem,
            TestCaseType.ACTUAL,
            {
              ...testCase,
            }
          );
        })
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error('Error in transcaction:', error.message);
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      // If transcaction failed change description to previous description
      await this.storageService.putObject(problem.descriptionPath, problem.description);
      throw InternalServerErrorException;
    }
    await queryRunner.release();

    return this.getProblemByID(updatedProblem.id);
  }

  async getProblemByID(problemId: number) {
    let description: string;
    const problem = await this.problemRepo
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.author', 'author')
      .leftJoinAndSelect('problem.tags', 'tag')
      .leftJoinAndSelect('problem.testCase', 'testCase')
      .select([
        'problem',
        'author.id',
        'author.firstName',
        'author.lastName',
        'tag.id',
        'tag.name',
        'testCase',
      ])
      .where('problem.id = :problemId', { problemId })
      .getOne();

    if (!problem) {
      throw new NotFoundException(`Problem not found`);
    }

    // Group test cases by type
    const exampleTestCases = problem.testCase.filter(
      (testCase) => testCase.type === TestCaseType.EXAMPLE
    );

    const actualTestCases = problem.testCase.filter(
      (testCase) => testCase.type === TestCaseType.ACTUAL
    );

    try {
      description = await this.storageService.getObject(problem.descriptionPath);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return {
      ...problem,
      description,
      testCase: undefined,
      exampleTestCases,
      actualTestCases,
    };
  }

  getProblemsForPublic(body: ProblemsQueryDto): Promise<AllProblemsDto> {
    return this.getAllProblems(body);
  }

  getProblemsForAdmin(user: User, body: ProblemsQueryDto): Promise<AllProblemsDto> {
    return this.getAllProblems(body, user);
  }

  async getAllProblems(body: ProblemsQueryDto, user?: User): Promise<AllProblemsDto> {
    const { pageIndex = 0, pageSize = 10 } = body;
    const query = this.problemRepo
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.author', 'author')
      .leftJoinAndSelect('problem.tags', 'tag')
      .select([
        'problem.id',
        'problem.title',
        'problem.difficulty',
        'problem.status',
        'problem.createdAt',
        'problem.updatedAt',
        'author.id',
        'author.firstName',
        'author.lastName',
        'tag.id',
        'tag.name',
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
      query.andWhere('problem.difficulty = :difficulty', { difficulty: body.difficulty });
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

    if (body.tagIds && body.tagIds.length > 0) {
      query.andWhere('filterTags.id IN (:...tagIds)', {
        tagIds: body.tagIds,
      });
    }

    if (!user) {
      query.andWhere('status = :status', { status: ProblemStatus.APPROVED });
    } else {
      const ability = this.abilityFactory.defineAbilityForUser(user);
      if (ability.can(Action.Manage, Problem)) {
        // No additional filters for moderator
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

  private convertTitletoSlug(title: string) {
    return title
      .toString()
      .toLowerCase()
      .trim() // Remove whitespace from both ends of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }
}
