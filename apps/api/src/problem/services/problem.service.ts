import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
    { title, difficulty, description, tagIds, testCases }: CreateProblemDto
  ) {
    const { tags } = await this.tagService.findTags(tagIds);

    const slug = `${this.convertTitletoSlug(title)}-${Math.random() * 10}}`;

    await this.storageService.putObject(`problems/${slug}/description.md`, description);

    const problemObj = this.problemRepo.create({
      title,
      difficulty,
      slug,
      tags,
      author: user,
      hasPlatformTestCases: false,
      status: ProblemStatus.UNPUBLISHED,
    });

    const problem = await this.problemRepo.save(problemObj);

    try {
      await this.testCaseService.saveAuthorTestCases({
        problemSlug: problem.slug,
        input: testCases.input,
        output: testCases.output,
      });
    } catch (error) {
      this.logger.log('Error while adding author testcases for problem', error);
      throw new InternalServerErrorException(
        'An error occurred while saving the test cases. Although the problem has been created, please update the problem to add the test cases again.'
      );
    }

    return problem;
  }

  async updateProblem(
    user: User,
    problemId: number,
    { title, difficulty, description, tagIds, testCases }: UpdateProblemDto
  ) {
    const { tags } = await this.tagService.findTags(tagIds);

    const problem = await this.findProblemById(problemId);

    if (user != problem.author) {
      throw new BadRequestException('You are not allowed to edit this problem');
    }

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

    const updatedProblem = await this.problemRepo.save(problem);

    try {
      await this.testCaseService.saveAuthorTestCases({
        problemSlug: problem.slug,
        input: testCases.input,
        output: testCases.output,
      });
    } catch (error) {
      this.logger.log('Error while updating author testcases for problem', error);
      throw new InternalServerErrorException('Internal server error!');
    }
    return updatedProblem;
  }

  async getProblem(problemId: number): Promise<ProblemDto> {
    const problem = await this.findProblemById(problemId);
    const { slug } = problem;

    const [description, testCases] = await Promise.all([
      this.storageService.getObject(`problems/${slug}/description.md`),
      this.testCaseService.getAuthorTestCases(slug),
    ]);

    return { ...problem, description, testCases };
  }

  async getProblemForAdmin(problemId: number): Promise<AdminProblemDto> {
    const problem = await this.findProblemById(problemId);

    const { slug } = problem;
    const [description, authorTestCases, platformTestCases] = await Promise.all([
      this.storageService.getObject(`problems/${slug}/description.md`),
      this.testCaseService.getAuthorTestCases(slug),
      this.testCaseService.getPlatformTestCases(slug),
    ]);

    return {
      ...problem,
      description,
      authorTestCases,
      platformTestCases,
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
        // only admin can see platform testcases status
        query.addSelect(['problem.hasPlatformTestCases']);
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

    if (!problem.hasPlatformTestCases && status === ProblemStatus.APPROVED) {
      throw new BadRequestException('Add platform testcases before approve problem');
    }

    problem.status = status;

    return this.problemRepo.save(problem);
  }

  async addPlatformTestCasesToProblem(
    problemId: number,
    { input, output }: AddTestCasesDto
  ): Promise<SuccessMessageDto> {
    const problem = await this.findProblemById(problemId);
    try {
      await this.testCaseService.savePlatformTestCases({
        problemSlug: problem.slug,
        input,
        output,
      });
    } catch (error) {
      this.logger.log('Error while adding platform testcases', error);
      throw new InternalServerErrorException('Internal server while adding testcase');
    }
    problem.hasPlatformTestCases = true;
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
