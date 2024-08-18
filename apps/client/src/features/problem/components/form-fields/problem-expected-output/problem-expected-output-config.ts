import { z } from 'zod';

export const questionConfig = {
  label: 'Expected Output',
};

export const modelKey = 'testCasesOutput';

export const problemExpectedOutputValidations = {
  [modelKey]: z
    .string()
    .min(1, { message: 'Expected Output must be 1 or more characters long' }),
};
