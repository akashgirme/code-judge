import { z } from 'zod';

export const questionConfig = {
  label: 'Select Langauge',
};

export const modelKey = 'solutionLanguage';

export const problemSolutionLangaugeValidations = {
  [modelKey]: z.enum(['c', 'cpp', 'java', 'go', 'js']),
};
