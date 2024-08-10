import { z } from 'zod';

export const questionConfig = {
  label: 'Enter problem internal notes (optional)',
};

export const modelKey = 'internalNotes';

export const problemInternalNotesValidations = {
  [modelKey]: z.string().optional(),
};
