import { z } from 'zod';

export const questionConfig = {
  label: 'Select Problem Tags',
};

export const modelKey = 'tags';

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const problemTagsValidations = {
  [modelKey]: z.array(optionSchema).min(1),
};
