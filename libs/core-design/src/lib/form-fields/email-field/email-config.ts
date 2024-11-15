import { z } from 'zod';

export const questionConfig = {
  label: 'Email Address',
};

export const modelKey = 'email';

export const emailValidations = {
  [modelKey]: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address'),
};
