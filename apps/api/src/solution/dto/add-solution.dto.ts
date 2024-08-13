import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Languages } from '@code-judge/common';

export class AddSolutionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  problemId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsEnum(Languages)
  language: Languages;
}
