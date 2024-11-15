import { z } from 'zod';

export const questionConfig = {
  label: 'I have read and agreed to the',
};

export const modelKey = 'agreeTerms';

export const agreeTermsValidations = {
  [modelKey]: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
};
