import { z } from 'zod';

export const questionConfig = {
  label: 'Select Problem Topics',
};

export const modelKey = 'topics';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const problemTopicsValidations = {
  [modelKey]: z.array(optionSchema).min(1),
};
