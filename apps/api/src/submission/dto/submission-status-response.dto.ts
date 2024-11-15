import { Languages, SubmissionState, SubmissionStatus } from '@code-judge/common';
import { ApiProperty } from '@nestjs/swagger';

class ResultDto {
  @ApiProperty()
  input: string;

  @ApiProperty()
  output: string;

  @ApiProperty()
  expectedOutput: string;
}

class StatusDto {
  @ApiProperty()
  sourceCode: string;

  @ApiProperty({
    type: 'enum',
    enum: Languages,
    enumName: 'Language',
  })
  language: Languages;

  @ApiProperty({
    type: 'enum',
    enum: SubmissionState,
    enumName: 'SubmissionState',
  })
  state: SubmissionState;

  @ApiProperty()
  error?: string;
}

export class RunStatusResponseDto extends StatusDto {
  @ApiProperty({
    type: 'enum',
    enum: SubmissionStatus,
    enumName: 'SubmissionStatus',
  })
  status: SubmissionStatus;

  @ApiProperty({ type: [ResultDto] })
  result?: ResultDto[];

  @ApiProperty()
  passed?: number;

  @ApiProperty()
  total?: number;
}

export class SubmitStatusResponseDto extends StatusDto {
  @ApiProperty()
  passed?: number;

  @ApiProperty()
  total?: number;

  @ApiProperty({
    type: 'enum',
    enum: SubmissionStatus,
    enumName: 'SubmissionStatus',
  })
  status: SubmissionStatus;

  @ApiProperty()
  memory?: number;

  @ApiProperty()
  time?: number;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
