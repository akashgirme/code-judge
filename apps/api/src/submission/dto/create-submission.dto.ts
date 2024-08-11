import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SupportedLanguages } from '../../problem/enums';

export class CreateSubmissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  problemId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    enum: SupportedLanguages,
    enumName: 'SupportedLanguages',
  })
  @IsEnum(SupportedLanguages)
  language: SupportedLanguages;
}
