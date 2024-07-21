import { SupportedLanguages } from '../enums';

export interface IExecutionPayload {
  sourceCodeSlug: string;
  inputTestCasesSlug: string;
  expectedOutputSlug: string;
  language: SupportedLanguages;
}
