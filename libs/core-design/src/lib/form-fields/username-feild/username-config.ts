import { z } from 'zod';

export const questionConfig = {
  label: 'Username',
};

export const modelKey = 'username';

export const usernameValidations = {
  [modelKey]: z
    .string()
    .regex(/^[a-z0-9]+$/, {
      message: 'Username can only contain lowercase letters and numbers',
    })
    .min(4, { message: 'Username must be 4 or more characters long' })
    .max(10, { message: 'Username must be 10 or fewer characters long' }),
};
