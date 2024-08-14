import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ProblemStatus } from '../enums';

export class ChangeProblemStatusDto {
  @ApiProperty()
  @IsString()
  remark: string;

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
  })
  @IsEnum(ProblemStatus)
  status: ProblemStatus;
}
