import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '../entities';
import { Repository } from 'typeorm';
import {
  AllProblemsQueryDto,
  AllProblemsResponseDto,
  CreateProblemDto,
  UpdateProblemDto,
} from '../dto';
import { StorageService } from '../../storage/storage.service';
import { User } from '../../user/entities';
import { TopicService } from './topic.service';
import { TestCaseService } from './testcase.service';
import { getPaginationMeta } from '../../common/utility';
import { ProblemStatus } from '../types';
import { AbilityFactory, Action } from '../../ability/ability.factory';

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

    const slug = this.convertTitletoSlug(title);

    // Save the problem description to the storage
    await this.storageService.putObject(`problems/${slug}/description.md`, description);

    // Save the solution provided by user to the storage
    await this.storageService.putObject(
      `problems/${slug}/solutions/solution.${solutionLanguage}`,
      solution
    );

    // Save the test case input and output to the storage
    await this.testCaseService.saveTestCases(testCasesInput, testCasesOutput, slug);

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

    // If user doesn't have access to update problem & is trying to update a different person blog post
    if (!ability.can(Action.Update, Problem) && problem.author.id !== user.id) {
      throw new ForbiddenException('You do not have permission to edit this problem');
    }

    const slug = problem.slug;
    // Save the problem description to the storage
    if (description) {
      await this.storageService.putObject(`problems/${slug}/description.md`, description);
    }

    // Save the solution provided by user to the storage
    if (solution && solutionLanguage) {
      await this.storageService.putObject(
        `problems/${slug}/solutions/solution.${solutionLanguage}`,
        solution
      );
    }

    // Save the test case input and output to the storage
    if (testCasesInput && testCasesOutput) {
      await this.testCaseService.saveTestCases(testCasesInput, testCasesOutput, slug);
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

  async getAllProblems({
    pageIndex = 0,
    pageSize = 10,
  }: AllProblemsQueryDto): Promise<AllProblemsResponseDto> {
    const [problems, totalItems] = await this.problemRepo
      .createQueryBuilder('problem')
      .select(['problem.id', 'problem.title', 'problem.difficulty', 'problem.slug'])
      .where('problem.status = :status', { status: ProblemStatus.UNPUBLISHED }) //Change this to APPROVED
      .orderBy('problem.createdAt', 'DESC')
      .take(pageSize)
      .skip(pageSize * pageIndex)
      .getManyAndCount();

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
      throw new NotFoundException('Problem not found');
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
