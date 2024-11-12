import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { DeleteResult, QueryRunner, Repository } from 'typeorm';
import { Problem } from '../entities';
import { TestCaseDto } from '../dto';
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
}
