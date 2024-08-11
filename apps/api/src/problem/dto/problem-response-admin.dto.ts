import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SupportedLanguages } from '../enums';

export class ProblemResponseAdminDto extends Problem {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  solution: string;

  @ApiProperty({
    enum: SupportedLanguages,
    enumName: 'SupportedLanguages',
  })
  solutionLanguage: SupportedLanguages;

  @ApiProperty()
  testCasesInput: string;

  @ApiProperty()
  testCasesOutput: string;
}
