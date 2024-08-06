import { z } from 'zod';

export const questionConfig = {
  label: 'One Time Password',
};

export const modelKey = 'otp';

export const otpValidations = {
  [modelKey]: z.string().length(6, { message: 'Otp should be 6 characters' }),
};
