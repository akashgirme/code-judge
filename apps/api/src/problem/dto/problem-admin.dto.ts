import { OutputLocationFilterSensitiveLog } from '@aws-sdk/client-s3';
import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { AddTestCasesDto } from './add-testcases.dto';

export class AdminProblemDto extends Problem {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: AddTestCasesDto })
  authorTestCases: AddTestCasesDto;

  @ApiProperty({ type: AddTestCasesDto })
  platformTestCases: AddTestCasesDto;
}
