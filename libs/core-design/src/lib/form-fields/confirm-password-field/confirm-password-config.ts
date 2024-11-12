import { z } from 'zod';

export const questionConfig = {
  label: 'Confirm Password',
};

export const modelKey = 'confirmPassword';

export const confirmPasswordValidations = {
  [modelKey]: z.string(),
};
