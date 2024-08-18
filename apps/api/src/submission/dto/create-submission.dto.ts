import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Languages } from '@code-judge/common';

export class CreateSubmissionDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  problemId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: 'enum',
    enum: Languages,
    enumName: 'SupportedLanguages',
  })
  @IsEnum(Languages)
  language: Languages;
}
