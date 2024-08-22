import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProblemStatus } from '../enums';

export class ChangeProblemStatusDto {
  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
  })
  @IsEnum(ProblemStatus)
  status: ProblemStatus;
}
