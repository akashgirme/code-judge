import { z } from 'zod';
import { ExecutionType } from '../enum';

export const ExecutionCallbackSchema = z.object({
  requestId: z.string().uuid(),
  executionType: z.nativeEnum(ExecutionType),
  totalTestCases: z.number(),
  testCasesPassed: z.number(),
  stderr: z.string().optional(),
});

export type ExecutionCallback = z.infer<typeof ExecutionCallbackSchema>;
