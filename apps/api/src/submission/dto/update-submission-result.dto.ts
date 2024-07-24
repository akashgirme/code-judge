import { IsNumber, IsString } from 'class-validator';

export class UpdateSubmissionDto {
  @IsString()
  submissionId: string;

  @IsNumber()
  testCasesPassed: number;

  @IsNumber()
  totalTestCases: number;

  @IsString()
  stderr?: string;
}
