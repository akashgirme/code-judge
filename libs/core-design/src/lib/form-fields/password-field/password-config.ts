import { z } from 'zod';

export const questionConfig = {
  label: 'Password',
};

export const modelKey = 'password';

export const passwordValidations = {
  [modelKey]: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password should contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password should contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password should contain at least one digit' })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, {
      message: 'Password should contain at least one special character',
    }),
};

export const passwordValidationsLoose = {
  [modelKey]: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long' }),
};
