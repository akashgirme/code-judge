import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AdminProblemDto extends Problem {
  @ApiProperty()
  @Expose()
  remark: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  authorTestCasesInput: string;

  @ApiProperty()
  authorTestCasesOutput: string;

  @ApiProperty()
  additionalTestCasesInput: string;

  @ApiProperty()
  additionalTestCasesOutput: string;
}
