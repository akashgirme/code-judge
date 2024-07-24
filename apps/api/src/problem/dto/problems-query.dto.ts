import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDto } from '../../common/dto';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { ProblemFilterDto } from './problem-filter.dto';

export class ProblemsQueryValidatorDto extends ValidatorIntersectionType(
  PaginationDto,
  SortingDto,
  ProblemFilterDto
) {}

export class ProblemsQueryDto extends IntersectionType(
  PaginationDto,
  SortingDto,
  ProblemFilterDto
) {}
