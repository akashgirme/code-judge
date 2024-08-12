import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ProblemStatus } from '../enums';

export class ChangeProblemStatusDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  problemId: string;

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
  })
  status: ProblemStatus;
}
