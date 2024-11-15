import { OutputLocationFilterSensitiveLog } from '@aws-sdk/client-s3';
import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { TestCaseDto } from './testcases.dto';

export class AdminProblemDto extends Problem {
  @ApiProperty()
  description: string;

  @ApiProperty({ type: [TestCaseDto] })
  exampleTestCases: TestCaseDto[];

  @ApiProperty({ type: [TestCaseDto] })
  actualTestCases: TestCaseDto[];
}
