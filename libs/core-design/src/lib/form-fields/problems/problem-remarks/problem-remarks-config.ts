import { z } from 'zod';

export const questionConfig = {
  label: 'Enter Problem Remarks',
};

export const modelKey = 'remark';

export const problemRemarksValidations = {
  [modelKey]: z.string().min(1, { message: 'Remark is required' }),
};
