import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Languages } from '@code-judge/common';

export class CreateSubmissionDto {
  @ApiProperty()
  @IsNumber()
  problemId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  @ApiProperty({
    enum: Languages,
    enumName: 'Languages',
    description: 'The Supported languages.',
  })
  @IsEnum(Languages)
  language: Languages;
}
