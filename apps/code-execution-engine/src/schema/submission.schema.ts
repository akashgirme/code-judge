import { z } from 'zod';
import { SupportedLanguages } from '../enums';

export const SubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  sourceCodeSlug: z.string().trim().min(1, { message: 'SourceCodeSlug Cannot be empty' }),
  inputTestCasesSlug: z
    .string()
    .trim()
    .min(1, { message: 'InputTestCasesSlug Cannot be empty' }),
  expectedOutputSlug: z
    .string()
    .trim()
    .min(1, { message: 'ExpectedOutputSlug Cannot be empty' }),
  language: z.nativeEnum(SupportedLanguages),
});
