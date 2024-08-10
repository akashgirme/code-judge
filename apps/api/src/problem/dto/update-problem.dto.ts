import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProblemStatus } from '../enums';
import { CreateProblemDto } from './create-problem.dto';

export class UpdateProblemDto extends PartialType(CreateProblemDto) {
  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
    required: false,
  })
  @IsEnum(ProblemStatus)
  status: ProblemStatus;
}
