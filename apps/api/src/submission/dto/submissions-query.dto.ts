import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDto } from '../../common/dto';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';
import { SubmissionFilterDto } from './submission-filter.dto';

export class SubmissionsQueryValidatorDto extends ValidatorIntersectionType(
  PaginationDto,
  SortingDto,
  SubmissionFilterDto
) {}

export class SubmissionsQueryDto extends IntersectionType(
  PaginationDto,
  SortingDto,
  SubmissionFilterDto
) {}
