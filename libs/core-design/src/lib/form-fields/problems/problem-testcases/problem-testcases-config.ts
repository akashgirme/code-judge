import { z } from 'zod';

export const questionConfig = {
  label: 'Test Cases',
  addButtonText: 'Add Test Case',
};

export const modelKey = 'testCases';

export const testCasesSchema = z.object({
  input: z.string().min(1, 'Input is required'),
  output: z.string().min(1, 'Output is required'),
});

export const problemTestCasesValidations = {
  [modelKey]: z.array(testCasesSchema).min(1, 'At least one test case is required'),
};
