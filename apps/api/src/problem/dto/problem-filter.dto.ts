import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ArrayUnique,
  IsEnum,
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { ProblemDifficulty, ProblemStatus } from '../enums';

export class ProblemFilterDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  authorId?: string;

  @ApiProperty({
    enum: ProblemDifficulty,
    enumName: 'ProblemDifficulty',
    example: 'EASY or MEDIUM or HARD',
    required: false,
  })
  @IsEnum(ProblemDifficulty)
  difficulty?: ProblemDifficulty;

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'PostStatus',
    example: 'approved or unpublished or reject',
    required: false,
  })
  @IsEnum(ProblemStatus)
  status?: ProblemStatus;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @ArrayUnique({ message: 'Tags array must contain unique TagIds' })
  @IsNumber(undefined, { each: true })
  tagIds?: number[];
}
