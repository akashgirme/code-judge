import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { Expose } from 'class-transformer';

export class AuthorProblemDto extends Problem {
  @ApiProperty()
  @Expose()
  remark: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  testCasesInput: string;

  @ApiProperty()
  testCasesOutput: string;
}
