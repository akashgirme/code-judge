import { z } from 'zod';

export const questionConfig = {
  label: 'Enter Internal Notes',
};

export const modelKey = 'internalNotes';

export const problemInternalNotesValidations = {
  [modelKey]: z.string().optional(),
};
