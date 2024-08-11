import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SupportedLanguages } from '../../problem/enums';

export class SubmissionFilterDto {
  @ApiProperty({
    enum: SupportedLanguages,
    enumName: 'Language',
  })
  @IsEnum(SupportedLanguages)
  language?: SupportedLanguages;
}
