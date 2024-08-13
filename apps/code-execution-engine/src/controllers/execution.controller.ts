import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { QueueService } from '../services';
import { CodeExecutionQueueJobTypes, Queues } from '../enums';
import { ExecutionRequestPayload } from '@code-judge/common';
import { ExecutionRequestSchema } from '@code-judge/common';

@injectable()
export class ExecutionController {
  constructor(private queueService: QueueService) {}

  async executeCode(req: Request, res: Response) {
    const result = ExecutionRequestSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    await this.addJobToExecutionQueue(req.body);

    res.json({ message: 'Submission received!' });
  }

  async addJobToExecutionQueue({
    requestId,
    executionType,
    sourceCode,
    testCasesInput,
    expectedOutput,
    language,
  }: ExecutionRequestPayload) {
    const queue = this.queueService.getQueue(Queues.CODE_EXECUTION);

    await queue.add(CodeExecutionQueueJobTypes.EXECUTE_CODE, {
      requestId,
      executionType,
      sourceCode,
      testCasesInput,
      expectedOutput,
      language,
    } as ExecutionRequestPayload);
  }
}
