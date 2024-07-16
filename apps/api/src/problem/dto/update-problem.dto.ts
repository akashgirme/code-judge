import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProblemStatus } from '../types';
import { CreateProblemDto } from './create-problem.dto';

export class UpdateProblemDto extends PartialType(CreateProblemDto) {
  @ApiProperty()
  @IsEnum(ProblemStatus)
  status: ProblemStatus;
}
