import { injectable, singleton } from 'tsyringe';
import { Worker, Job } from 'bullmq';
import { Queues, ResultQueueJobType } from '../enums';
import { logger } from '../utils';
import { QueueService } from './queue.service';
import path from 'path';
import { FileHandleService } from './file-handle.service';
import { ExecutionCallback, StatusMessage } from '@code-judge/common';
import axios from 'axios';

@injectable()
@singleton()
export class HandleResultService {
  private resultJobQueueWorker: Worker;
  private connection;

  constructor(
    private queueService: QueueService,
    private fileHandleService: FileHandleService
  ) {
    this.connection = queueService.connection;
    this.resultJobQueueWorker = this.instantiateWorker();
  }

  private instantiateWorker(): Worker {
    return new Worker(
      Queues.WORKERS_RESULT_JOB_QUEUE,
      async (job: Job) => {
        switch (job.name) {
          case ResultQueueJobType.SUCCESSFUL_JOB:
            this.handleSuccessfulJob(job.data.id);
            break;
          case ResultQueueJobType.FAILED_JOB:
            this.handleFailedJob(job.data.id);
            break;
          default:
            throw new Error(`Job is not defined: ${job.name}`);
        }
      },
      { connection: this.connection, concurrency: 1 }
    );
  }

  async handleSuccessfulJob(id: number) {
    const jobDir = path.join(process.env.WORKINGDIR || '/tmp', id.toString() as string);
    const { status, testCasesPassed, totalTestCases, stderr, time, memory } =
      await this.fileHandleService.processResult(jobDir);

    const statusMessage = this.buildStatusMessage(
      status,
      testCasesPassed,
      totalTestCases
    );

    const callbackObj: ExecutionCallback = {
      submissionId: id,
      statusMessage,
      testCasesPassed,
      totalTestCases,
      stderr,
      time,
      memory,
    };

    this.sendCallback(callbackObj);
    this.fileHandleService.deleteDirectory(jobDir);
  }

  async handleFailedJob(id: number) {
    const jobDir = path.join(process.env.WORKINGDIR || '/tmp', id.toString() as string);
    const callbackObj: ExecutionCallback = {
      submissionId: id,
      statusMessage: StatusMessage.UNEXPECTED_ERROR,
    };

    this.sendCallback(callbackObj);
    this.fileHandleService.deleteDirectory(jobDir);
  }

  private buildStatusMessage(
    status: string,
    testCasesPassed?: number,
    totalTestCases?: number
  ) {
    if (status == 'successful' && testCasesPassed === totalTestCases) {
      return StatusMessage.ACCEPTED;
    } else if (status == 'successful' && testCasesPassed !== totalTestCases) {
      return StatusMessage.WRONG_ANSWER;
    } else if (status == 'compilation-error') {
      return StatusMessage.COMPILE_ERROR;
    } else if (status == 'execution-error') {
      return StatusMessage.EXECUTION_ERROR;
    } else if (status == 'runtime-error') {
      return StatusMessage.RUNTIME_ERROR;
    } else if (status == 'memory-exceeded') {
      return StatusMessage.MEMORY_LIMIT_EXCEEDED;
    } else if (status == 'time-limit-exceeded') {
      return StatusMessage.TIME_LIMIT_EXCEEDED;
    } else if (status == 'error') {
      return StatusMessage.UNEXPECTED_ERROR;
    } else {
      return StatusMessage.REJECTED;
    }
  }

  private async sendCallback(callbackObj: ExecutionCallback) {
    const callbackUrl = process.env.CALLBACK_URL;
    const apiKey = process.env.EXECUTION_API_KEY;

    if (!callbackUrl || !apiKey) {
      logger.error('Callback URL or API Key not set');
      return;
    }

    const payload = callbackObj;

    try {
      const response = await axios.post(callbackUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        logger.info(`Callback sent successfully for job ${callbackObj.submissionId}`);
      } else {
        logger.warn(
          `Callback request for job ${callbackObj.submissionId} returned status: ${response.status}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          `Error sending callback for job ${callbackObj.submissionId}: ${error.message}, ${error.response}, ${error.request}`
        );
      } else {
        logger.error(
          `Unexpected error sending callback for job ${callbackObj.submissionId}:`,
          error
        );
      }
    }
  }
}
