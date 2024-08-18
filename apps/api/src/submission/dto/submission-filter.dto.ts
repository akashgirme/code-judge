import { Languages } from '@code-judge/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class SubmissionFilterDto {
  @ApiProperty({
    type: 'enum',
    enum: Languages,
    enumName: 'SupportedLanguages',
  })
  @IsEnum(Languages)
  language?: Languages;
}
