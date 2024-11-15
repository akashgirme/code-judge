import { z } from 'zod';

export const questionConfig = {
  label: 'First Name',
};

export const modelKey = 'firstName';

export const firstNameValidations = {
  [modelKey]: z
    .string()
    .min(2, { message: 'Name must be 2 or more characters long' }),
};
