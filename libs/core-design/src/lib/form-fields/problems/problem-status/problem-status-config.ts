import { z } from 'zod';

export const questionConfig = {
  label: 'Select Problem Status',
};

export const modelKey = 'status';

export const problemStatusValidations = {
  [modelKey]: z.enum(['unpublished', 'approved', 'rejected']),
};
