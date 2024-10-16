import { SubmissionType } from 'libs/common/src/enum/submission-type.enum';
import { LanguageConfig } from './langauge-config.interface';
import { TestCases } from 'libs/common/src/types/submission.interface';
import { Languages, SubmissionState, SubmissionStatus } from '@code-judge/common';
import { Result } from './result.interface';

export interface Submission {
  id: string;
  type: SubmissionType;
  userId: number;
  problemId: number;
  sourceCode: string;
  language: Languages;
  languageConfig: LanguageConfig;
  createdAt: Date;
  testCases: TestCases[];
  state: SubmissionState;
  time?: number;
  wallTime?: number;
  memory?: number;
  exitCode?: number;
  exitSignal?: string;
  message?: string;
  stdout?: string;
  stderr?: string;
  status?: SubmissionStatus;
  result?: Result[];
}
