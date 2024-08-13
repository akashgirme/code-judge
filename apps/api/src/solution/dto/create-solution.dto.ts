import { Languages } from '@code-judge/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateSolutionDto {
  @ApiProperty()
  @IsNumber()
  problemId: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    enum: Languages,
    enumName: 'Languages',
  })
  @IsEnum(Languages)
  language: Languages;
}
