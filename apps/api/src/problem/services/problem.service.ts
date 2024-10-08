import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../entities';
import { Repository } from 'typeorm';
import {
  AllProblemsDto,
  ChangeProblemStatusDto,
  CreateProblemDto,
  AdminProblemDto,
  ProblemDto,
  ProblemsQueryDto,
  UpdateProblemDto,
  AddTestCasesDto,
  SuccessMessageDto,
} from '../dto';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { TagService } from './topic.service';
import { TestCaseService } from './testcase.service';
import { getPaginationMeta } from '../../common/utility';
import { ProblemStatus } from '../enums';
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
    { title, difficulty, description, tagIds }: CreateProblemDto
  ) {
    const { tags } = await this.tagService.findTags(tagIds);

    const slug = `${this.convertTitletoSlug(title)}-${Date.now()}`;

    await this.storageService.putObject(`problems/${slug}/description.md`, description);

    const problem = this.problemRepo.create({
      title,
      difficulty,
      slug,
      tags,
      author: user,
      hasTestCases: false,
      status: ProblemStatus.UNPUBLISHED,
    });

    return await this.problemRepo.save(problem);
  }

  async updateProblem(
    problemId: number,
    { title, difficulty, description, tagIds }: UpdateProblemDto
  ) {
    const { tags } = await this.tagService.findTags(tagIds);

    const problem = await this.findProblemById(problemId);

    if (description) {
      await this.storageService.putObject(
        `problems/${problem.slug}/description.md`,
        description
      );
    }

    Object.assign(problem, {
      title,
      difficulty,
      tags,
      status: ProblemStatus.UNPUBLISHED,
    });

    return this.problemRepo.save(problem);
  }

  async getProblem(problemId: number): Promise<ProblemDto> {
    const problem = await this.findProblemById(problemId);
    const { slug } = problem;

    const description = await this.storageService.getObject(
      `problems/${slug}/description.md`
    );

    return { ...problem, description };
  }

  async getProblemForAdmin(problemId: number): Promise<AdminProblemDto> {
    const problem = await this.findProblemById(problemId);

    const { slug } = problem;
    const [description, testcases] = await Promise.all([
      this.storageService.getObject(`problems/${slug}/description.md`),
      this.testCaseService.getTestCases(slug),
    ]);

    return {
      ...problem,
      description,
      testCasesInput: testcases?.input ?? '',
      testCasesOutput: testcases?.output ?? '',
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
        'problem.deletedAt',
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

  async findProblemById(problemId: number): Promise<Problem> {
    const problem = await this.problemRepo
      .createQueryBuilder('problem')
      .leftJoinAndSelect('problem.author', 'author')
      .leftJoinAndSelect('problem.tags', 'tag')
      .select([
        'problem',
        'author.id',
        'author.firstName',
        'author.lastName',
        'tag.id',
        'tag.name',
      ])
      .where('problem.id = :problemId', { problemId })
      .getOne();

    if (!problem) {
      throw new NotFoundException(`Problem not found with id ${problemId}`);
    }

    return problem;
  }

  async changeProblemStatus(problemId: number, { status }: ChangeProblemStatusDto) {
    const problem = await this.findProblemById(problemId);

    problem.status = status;

    return this.problemRepo.save(problem);
  }

  async addTestCasesToProblem({
    problemId,
    input,
    output,
  }: AddTestCasesDto): Promise<SuccessMessageDto> {
    const problem = await this.findProblemById(problemId);
    await this.testCaseService.saveTestCases(problem.slug, input, output);
    problem.hasTestCases = true;
    await this.problemRepo.save(problem);
    return { message: 'Testcases added successfully' };
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
