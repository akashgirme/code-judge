import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { QueueService } from '../services';
import { CodeExecutionQueueJobTypes, Queues, SupportedLanguages } from '../enums';
import { IExecutionPayload } from '../interfaces';
import { SubmissionSchema } from '../schema';

@injectable()
export class ExecutionController {
  constructor(private queueService: QueueService) {}

  async executeCode(req: Request, res: Response) {
    const result = SubmissionSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    await this.addJobToExecutionQueue(req.body);

    res.json({ message: 'Submission received!' });
  }

  getSupportedLanguages(req: Request, res: Response) {
    res.json({ SupportedLanguages });
  }

  async addJobToExecutionQueue({
    submissionId,
    sourceCodeSlug,
    inputTestCasesSlug,
    expectedOutputSlug,
    language,
  }: IExecutionPayload) {
    const queue = this.queueService.getQueue(Queues.CODE_EXECUTION);

    await queue.add(CodeExecutionQueueJobTypes.EXECUTE_CODE, {
      submissionId,
      sourceCodeSlug,
      inputTestCasesSlug,
      expectedOutputSlug,
      language,
    });
  }
}
