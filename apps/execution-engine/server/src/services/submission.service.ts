import { injectable } from 'tsyringe';
import { ExecutionQueueJobDataType, ExecutionRequestPayload } from '@code-judge/common';
import { QueueService } from './queue.service';
import { getJobQueue, logger } from '../utils';

@injectable()
export class SubmissionService {
  constructor(private queueService: QueueService) {}
  async executeCode({
    submissionId,
    sourceCode,
    testCasesInput,
    expectedOutput,
    language,
  }: ExecutionRequestPayload): Promise<void> {
    //
    const jobPayload: ExecutionQueueJobDataType = {
      id: submissionId,
      language,
      sourceCode,
      input: testCasesInput,
      expectedOutput,
    };

    // Add Job to Queue
    const queue = this.queueService.getQueue(getJobQueue(language));
    await queue.add(
      `${language}`,
      { ...jobPayload },
      { removeOnComplete: true, removeOnFail: { age: 10 } }
    );

    logger.info(`Job has been added to the queue for submission: ${submissionId}`);
  }
}
