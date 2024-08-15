import { z } from 'zod';

export const questionConfig = {
  label: 'Select language',
};

export const modelKey = 'language';

export const languageSelectValidations = {
  [modelKey]: z.enum(['cpp', 'c', 'go', 'java', 'js']),
};
