import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsNumber } from 'class-validator';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { Languages } from '@code-judge/common';
import { PaginationDto, SortingDto } from '../../common/dto';

class SolutionQuery {
  @ApiProperty()
  @IsNumber()
  @IsEmpty()
  problemId: number;

  @ApiProperty()
  @IsEnum(Languages)
  language: Languages;
}

export class SolutionQueryValidatorDto extends ValidatorIntersectionType(
  PaginationDto,
  SortingDto,
  SolutionQuery
) {}

export class SolutionQueryDto extends IntersectionType(
  PaginationDto,
  SortingDto,
  SolutionQuery
) {}
