import { Languages } from '@code-judge/common';
import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProblemResponseAdminDto extends Problem {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  primarySolution: string;

  @ApiProperty({
    enum: Languages,
    enumName: 'SupportedLanguages',
  })
  primarySolutionLanguage: Languages;

  @ApiProperty()
  testCasesInput: string;

  @ApiProperty()
  testCasesOutput: string;
}
