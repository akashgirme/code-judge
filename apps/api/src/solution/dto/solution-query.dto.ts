import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsString } from 'class-validator';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { Languages } from '@code-judge/common';

class SolutionQuery {
  @ApiProperty()
  @IsString()
  @IsEmpty()
  problemId: string;

  @ApiProperty()
  @IsEnum(Languages)
  language: Languages;
}

export class SolutionQueryValidatorDto extends ValidatorIntersectionType(SolutionQuery) {}

export class SolutionQueryDto extends IntersectionType(SolutionQuery) {}
