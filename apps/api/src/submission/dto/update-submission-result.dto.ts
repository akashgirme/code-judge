import { IsNumber, IsString } from 'class-validator';

export class UpdateSubmissionResultDto {
  @IsString()
  submissionId: string;

  @IsNumber()
  testCasesPassed: number;

  @IsNumber()
  totalTestCases: number;

  @IsString()
  stderr?: string;
}
