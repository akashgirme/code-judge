import { z } from 'zod';

export const questionConfig = {
  label: 'Write your code here',
};

export const modelKey = 'sourceCode';

export const codeEditorValidations = {
  [modelKey]: z.string().min(1, { message: 'Code should not be empty' }),
};
