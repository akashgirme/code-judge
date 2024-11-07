import { z } from 'zod';

export const questionConfig = {
  label: 'Select language',
};

export const modelKey = 'language';

export const selectLanguageValidations = {
  [modelKey]: z.enum(['c', 'cpp', 'go', 'java', 'js']),
};
