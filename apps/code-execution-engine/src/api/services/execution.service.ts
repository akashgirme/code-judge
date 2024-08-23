import { injectable } from 'tsyringe';
import { ExecutionRequestPayload, Languages } from '@code-judge/common';
import { FileHandleService } from './file-handle.service';
import { QueueJobTypes, Queues } from '../enums';
import { QueueService } from './queue.service';

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
    //Isolate the job - Add file to volume dir.
    await this.fileHandleService.storeFiles(
      submissionId,
      language,
      sourceCode,
      testCasesInput,
      expectedOutput
    );

    // Add Job to Queue
    const queue = this.queueService.getQueue(Queues.WORKERS_JOB_QUEUE);
    await queue.add(this.getJobType(language), { id: submissionId });

    console.log(`Job has been added to the queue for submission: ${submissionId}`);
  }
  private getJobType(language: Languages) {
    switch (language) {
      case Languages.C:
        return QueueJobTypes.C_CODE_EXECUTION;
      case Languages.CPP:
        return QueueJobTypes.CPP_CODE_EXECUTION;
      case Languages.GO:
        return QueueJobTypes.GO_CODE_EXECUTION;
      case Languages.JAVA:
        return QueueJobTypes.JAVA_CODE_EXECUTION;
      case Languages.JAVASCRIPT:
        return QueueJobTypes.JAVASCRIPT_CODE_EXECUTION;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }
}
