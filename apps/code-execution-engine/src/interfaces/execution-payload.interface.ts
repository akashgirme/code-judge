import { SupportedLanguages } from '../enums';

export interface IExecutionPayload {
  submissionId: string;
  sourceCodeSlug: string;
  inputTestCasesSlug: string;
  expectedOutputSlug: string;
  language: SupportedLanguages;
}
