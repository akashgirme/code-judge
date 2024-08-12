import { z } from 'zod';
import { Languages, ExecutionType } from '../enum';

export const ExecutionRequestSchema = z.object({
  requestId: z.string().uuid(),
  sourceCode: z.string().min(1, { message: 'Source Code cannot be empty' }),
  testCasesInput: z.string().min(1, { message: 'TestCases Input cannot be empty' }),
  expectedOutput: z.string().min(1, { message: 'Expected Output cannot be empty' }),
  language: z.nativeEnum(Languages),
  executionType: z.nativeEnum(ExecutionType),
});

export type ExecutionRequestPayload = z.infer<typeof ExecutionRequestSchema>;
