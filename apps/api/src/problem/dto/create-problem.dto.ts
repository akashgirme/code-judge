import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  Matches,
  IsNumber,
  ArrayUnique,
  ValidateNested,
} from 'class-validator';
import { ProblemDifficulty, ProblemStatus } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TestCaseDto } from './testcases.dto';

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

  @ApiProperty({ required: false })
  @IsString()
  internalNotes?: string;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @ArrayUnique({ message: 'Tags array must contain unique TagIds' })
  @IsNumber(undefined, { each: true })
  tagIds?: number[];

  @ApiProperty({ enum: ProblemStatus, enumName: 'ProblemStatus', required: false })
  @IsEnum(ProblemStatus)
  status: ProblemStatus;

  @ApiProperty({ type: [TestCaseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  exampleTestCases: TestCaseDto[];

  @ApiProperty({ type: [TestCaseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  actualTestCases: TestCaseDto[];
}
