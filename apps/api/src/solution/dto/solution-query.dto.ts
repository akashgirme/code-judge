import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { Languages } from '@code-judge/common';
import { PaginationDto, SortingDto } from '../../common/dto';

class SolutionQuery {
  @ApiProperty()
  @IsNumber()
  problemId: number;

  @ApiProperty({ type: 'enum', enum: () => Languages, enumName: 'Languages' })
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
