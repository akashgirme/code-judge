import { z } from 'zod';

export const questionConfig = {
  label: 'Problem Description',
};

export const modelKey = 'description';

export const problemDescriptionValidations = {
  [modelKey]: z
    .string()
    .min(32, { message: 'Description must be 32 or more characters long' }),
};
