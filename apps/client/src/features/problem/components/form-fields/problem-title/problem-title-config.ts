import { z } from 'zod';

export const questionConfig = {
  label: 'Enter Problem Title',
};

export const modelKey = 'title';

export const problemTitleValidations = {
  [modelKey]: z.string().min(4, { message: 'Title must be 4 or more characters long' }),
};
