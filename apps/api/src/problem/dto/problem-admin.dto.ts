import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AdminProblemDto extends Problem {
  @ApiProperty()
  @Expose()
  remark: string;

  @ApiProperty()
  @IsString()
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
