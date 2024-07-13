import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto';
import { IntersectionType as ValidatorIntersectionType } from '@nestjs/mapped-types';

export class AllProblemsQueryValidatorDto extends ValidatorIntersectionType(
  PaginationDto
) {}

export class AllProblemsQueryDto extends IntersectionType(PaginationDto) {}
