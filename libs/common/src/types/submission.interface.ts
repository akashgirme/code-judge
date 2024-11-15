import { Languages } from '../enum/langauge.enum';
import { SubmissionState } from '../enum/submission-state.enum';
import { SubmissionStatus } from '../enum/submission-status.enum';
import { SubmissionType } from '../enum/submission-type.enum';

export interface TestCases {
  input: string;
  output: string;
}

export interface TestCasesResult {
  input: string;
  output: string;
  expectedOutput: string;
}

export interface SubmissionRequest {
  id: string;
  type: SubmissionType;
  userId: number;
  problemId: number;
  sourceCode: string;
  language: Languages;
  createdAt: Date;
  testCases: TestCases[];
  state: SubmissionState;
}

export interface SubmissionResult {
  type: SubmissionType;
  userId: number;
  problemId: number;
  sourceCode: string;
  language: Languages;
  createdAt: Date;
  testCases: TestCases[];
  state: SubmissionState;
  status: SubmissionStatus;
  result: TestCasesResult[];
  passedTestCases?: number;
  totalTestCases?: number;
  time?: number;
  memory?: number;
  stderr?: string;
}
