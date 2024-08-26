import { z } from 'zod';

export const questionConfig = {
  label: 'Input TestCases',
};

export const modelKey = 'input';

export const problemInputTestCasesValidations = {
  [modelKey]: z
    .string()
    .min(1, { message: 'Input TestCases must be 1 or more characters long' }),
};
