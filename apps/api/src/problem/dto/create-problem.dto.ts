import { IsString, IsNotEmpty, IsEnum, IsArray, Matches } from 'class-validator';
import { ProblemDifficulty, SupportedLanguages } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProblemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Title can only contain alphabets, numbers, and spaces',
  })
  title: string;

  @ApiProperty({
    enum: ProblemDifficulty,
    enumName: 'ProblemDifficulty',
  })
  @IsEnum(ProblemDifficulty)
  difficulty: ProblemDifficulty;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  solution: string;

  @ApiProperty({
    enum: SupportedLanguages,
    enumName: 'SupportedLanguages',
  })
  @IsEnum(SupportedLanguages)
  solutionLanguage: SupportedLanguages;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testCasesInput: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  testCasesOutput: string;

  @ApiProperty({ required: false })
  @IsString()
  internalNotes?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  topicIds: string[];
}
