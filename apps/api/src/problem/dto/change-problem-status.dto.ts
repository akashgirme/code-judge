import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ProblemStatus } from '../enums';

export class ChangeProblemStatusDto {
  @ApiProperty()
  @IsNumber()
  problemId: number;

  @ApiProperty()
  @IsString()
  remark: string;

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
  })
  status: ProblemStatus;
}
