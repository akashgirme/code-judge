import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { SupportedLanguages } from '../../problem/enums';
import { IsEmpty, IsEnum, IsString } from 'class-validator';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';

class SolutionQuery {
  @ApiProperty()
  @IsString()
  @IsEmpty()
  problemId: string;

  @ApiProperty()
  @IsEnum(SupportedLanguages)
  language: SupportedLanguages;
}

export class SolutionQueryValidatorDto extends ValidatorIntersectionType(SolutionQuery) {}

export class SolutionQueryDto extends IntersectionType(SolutionQuery) {}
