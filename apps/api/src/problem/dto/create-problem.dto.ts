import { IsString, IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { ProblemDifficulty, SupportedLanguages } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import internal from 'stream';

export class CreateProblemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
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

  @ApiProperty()
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

  @ApiProperty()
  @IsString()
  internalNotes: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  topicIds: string[];
}
