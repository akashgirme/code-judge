import { injectable } from 'tsyringe';
import { ExecutionRequestPayload, Languages } from '@code-judge/common';
import { FileHandleService } from './file-handle.service';
import { Queues } from '../enums';
import { QueueService } from './queue.service';
import { logger } from '../utils';

@injectable()
export class ExecutionService {
  constructor(
    private readonly fileHandleService: FileHandleService,
    private queueService: QueueService
  ) {}
  async executeCode({
    submissionId,
    sourceCode,
    testCasesInput,
    expectedOutput,
    language,
  }: ExecutionRequestPayload): Promise<void> {
    // Add file such as input, code, output etc. in respective dir..
    await this.fileHandleService.storeFiles(
      submissionId,
      language,
      sourceCode,
      testCasesInput,
      expectedOutput
    );

    // Add Job to Queue
    const queue = this.queueService.getQueue(this.getJobQueue(language));
    await queue.add(
      `${language}`,
      { id: submissionId },
      { removeOnComplete: true, removeOnFail: { age: 10 } }
    );

    logger.info(`Job has been added to the queue for submission: ${submissionId}`);
  }
  private getJobQueue(language: Languages) {
    switch (language) {
      case Languages.C:
        return Queues.C_JOB_QUEUE;
      case Languages.CPP:
        return Queues.CPP_JOB_QUEUE;
      case Languages.GO:
        return Queues.GO_JOB_QUEUE;
      case Languages.JAVA:
        return Queues.JAVA_JOB_QUEUE;
      case Languages.JAVASCRIPT:
        return Queues.JS_JOB_QUEUE;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }
}
