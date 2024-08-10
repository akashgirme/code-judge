import { z } from 'zod';

export const questionConfig = {
  label: 'Write Solution of Problem',
};

export const modelKey = 'solution';

export const problemSolutionValidations = {
  [modelKey]: z
    .string()
    .min(8, { message: 'Solution must be 8 or more characters long' }),
};
