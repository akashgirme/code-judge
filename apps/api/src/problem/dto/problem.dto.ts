import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { AddTestCasesDto } from './add-testcases.dto';

export class ProblemDto extends Problem {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: AddTestCasesDto })
  testCases: AddTestCasesDto;
}
