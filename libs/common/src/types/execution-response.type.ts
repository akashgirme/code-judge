import { z } from 'zod';
import { StatusMessage } from '../enum';

export const ExecutionCallbackSchema = z.object({
  submissionId: z.number(),
  statusMessage: z.nativeEnum(StatusMessage),
  totalTestCases: z.number().optional(),
  testCasesPassed: z.number().optional(),
  stderr: z.string().optional(),
  time: z.number().optional(),
  memory: z.number().optional(),
});

export type ExecutionCallback = z.infer<typeof ExecutionCallbackSchema>;
