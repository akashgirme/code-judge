import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Languages } from '@code-judge/common';

export class CreateSubmissionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  problemId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    enum: Languages,
    enumName: 'SupportedLanguages',
  })
  @IsEnum(Languages)
  language: Languages;
}
