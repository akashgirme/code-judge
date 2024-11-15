import { z } from 'zod';

export const questionConfig = {
  label: 'Problem Description',
};

export const modelKey = 'description';

export const problemDescriptionValidations = {
  [modelKey]: z
    .string()
    .min(64, { message: 'Description must be 64 or more characters long' }),
};
