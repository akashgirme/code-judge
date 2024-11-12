import { z } from 'zod';

export const questionConfig = {
  label: 'Last Name',
};

export const modelKey = 'lastName';

export const lastNameValidations = {
  [modelKey]: z
    .string()
    .min(2, { message: 'Name must be 2 or more characters long' }),
};
