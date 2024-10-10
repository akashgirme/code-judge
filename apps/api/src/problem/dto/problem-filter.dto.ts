import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ArrayUnique,
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ProblemDifficulty, ProblemStatus } from '../enums';
import { Transform } from 'class-transformer';

export class ProblemFilterDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  authorId?: number;

  @ApiProperty({
    enum: ProblemDifficulty,
    enumName: 'ProblemDifficulty',
    required: false,
    description: 'The difficulty level of the problem',
  })
  @IsOptional()
  @IsEnum(ProblemDifficulty)
  difficulty?: ProblemDifficulty;

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
    required: false,
    description: 'The status of the problem',
  })
  @IsOptional()
  @IsEnum(ProblemStatus)
  status?: ProblemStatus;

  @ApiProperty({ required: false, type: [Number] })
  @IsArray()
  @IsOptional()
  @ArrayUnique({ message: 'Tags array must contain unique TagIds' })
  @Transform(({ value }) => value.map((val) => parseInt(val)), { toClassOnly: true })
  @IsInt({ each: true })
  tagIds?: number[];
}
