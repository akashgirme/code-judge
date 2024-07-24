import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ArrayUnique, IsEnum, IsString } from 'class-validator';
import { ProblemDifficulty, ProblemStatus } from '../enums';

export class ProblemFilterDto {
  @ApiProperty({ required: false })
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsUUID()
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

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @ArrayUnique({ message: 'Topics array must contain unique TopicIds' })
  @IsUUID(undefined, { each: true })
  topicIds?: string[];
}
