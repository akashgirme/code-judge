import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { TestCaseDto } from './create-testcases.dto';
import { TestCase } from '../entities/test-case.entity';
import { Exclude } from 'class-transformer';

export class ProblemDto extends Problem {
  @Exclude()
  hasPlatformTestCases: boolean;

  @Exclude()
  remark: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [TestCase] })
  exampleTestCases: TestCase[];

  @Exclude()
  actualTestCases: TestCase[];
}
