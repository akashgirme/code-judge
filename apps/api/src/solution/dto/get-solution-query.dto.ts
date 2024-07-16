import { ApiProperty } from '@nestjs/swagger';
import { SupportedLanguages } from '../../problem/types';
import { IsEmpty, IsEnum, IsString } from 'class-validator';

export class GetSolutionQueryDto {
  @ApiProperty()
  @IsString()
  @IsEmpty()
  problemId: string;

  @ApiProperty()
  @IsEnum(SupportedLanguages)
  language: SupportedLanguages;
}
