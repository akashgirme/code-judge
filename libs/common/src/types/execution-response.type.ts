import { z } from 'zod';
import { StatusMessage } from '../enum';

export const ExecutionCallbackSchema = z.object({
  submissionId: z.number(),
  totalTestCases: z.number(),
  testCasesPassed: z.number(),
  statusMessage: z.nativeEnum(StatusMessage),
});

export type ExecutionCallback = z.infer<typeof ExecutionCallbackSchema>;
