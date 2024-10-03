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
import { ProblemDifficulty } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AddTestCasesDto } from './add-testcases.dto';

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

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @ArrayUnique({ message: 'Tags array must contain unique TagIds' })
  @IsNumber(undefined, { each: true })
  tagIds?: number[];

  @ApiProperty({ type: AddTestCasesDto })
  @ValidateNested()
  @Type(() => AddTestCasesDto)
  testCases: AddTestCasesDto;
}
