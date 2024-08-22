import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class AdminProblemDto extends Problem {
  @ApiProperty()
  description: string;

  @ApiProperty()
  testCasesInput: string;

  @ApiProperty()
  testCasesOutput: string;
}
