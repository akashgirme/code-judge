import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { DeleteResult, QueryRunner, Repository } from 'typeorm';
import { Problem } from '../entities';
import { AuthorProblemDto, CreateTestCasesDto, TestCaseDto } from '../dto';
import { TestCaseType } from '../enums';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCase } from '../entities/test-case.entity';

@Injectable()
export class TestCaseService {
  private logger = new Logger(TestCaseService.name);
  constructor(
    @InjectRepository(TestCase) private testCaseRepo: Repository<TestCase>,
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService
  ) {}

  async createTestCase(
    queryRunner: QueryRunner,
    problem: Problem,
    type: TestCaseType,
    { input, output }: TestCaseDto
  ) {
    const newTestCase = this.testCaseRepo.create({
      input,
      output,
      type,
      problem,
    });
    return await queryRunner.manager.save(newTestCase);
  }

  async getExampleTestCases(problemId: number): Promise<TestCase[]> {
    const testCases = await this.testCaseRepo
      .createQueryBuilder('testcase')
      .leftJoinAndSelect('testcase.problem', 'problem')
      .select(['testcase'])
      .where('problem.id =:problemId', { problemId })
      .andWhere('testcase.type = :type', { type: TestCaseType.EXAMPLE })
      .getMany();
    if (testCases.length == 0) {
      throw new NotFoundException(`No TestCases Found`);
    }
    return testCases;
  }

  async getActualTestCases(problemId: number): Promise<TestCase[]> {
    const testCases = await this.testCaseRepo
      .createQueryBuilder('testcase')
      .leftJoinAndSelect('testcase.problem', 'problem')
      .select(['testcase'])
      .where('problem.id =:problemId', { problemId })
      .andWhere('testcase.type = :type', { type: TestCaseType.ACTUAL })
      .getMany();
    if (testCases.length == 0) {
      throw new NotFoundException(`No TestCases Found`);
    }
    return testCases;
  }

  async getTestCase(id: number) {
    const testCase = await this.testCaseRepo.findOne({
      where: { id },
    });

    if (!testCase) {
      throw new NotFoundException(`No TestCase Found`);
    }
    return testCase;
  }

  async deleteTestCase(queryRunner: QueryRunner, id: number): Promise<DeleteResult> {
    return queryRunner.manager.delete(TestCase, id);
  }

  async addTestCases(
    problemId: number,
    { testCases }: CreateTestCasesDto
  ): Promise<AuthorProblemDto> {
    const problem = await this.problemService.getProblemByID(problemId);

    const queryRunner = this.testCaseRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      testCases.map(
        async (testCase: TestCaseDto) =>
          await this.createTestCase(queryRunner, problem, TestCaseType.ACTUAL, testCase)
      );
      problem.hasPlatformTestCases = true;

      await queryRunner.manager.save(problem);
      await queryRunner.commitTransaction();
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      this.logger.log('Error while adding actual testcases', error);
      throw new InternalServerErrorException();
    }

    await queryRunner.release();
    return this.problemService.getProblemByID(problem.id);
  }
}
