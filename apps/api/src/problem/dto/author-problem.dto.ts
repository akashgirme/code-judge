import { OutputLocationFilterSensitiveLog } from '@aws-sdk/client-s3';
import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { TestCaseDto } from './create-testcases.dto';
import { Exclude } from 'class-transformer';
import { TestCase } from '../entities/test-case.entity';

export class AuthorProblemDto extends Problem {
  @ApiProperty()
  description: string;

  @Exclude()
  hasPlatformTestCases: boolean;

  @ApiProperty({ type: () => [TestCase] })
  exampleTestCases: TestCase[];

  @Exclude()
  actualTestCases: TestCase[];
}
