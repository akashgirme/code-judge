import { injectable, singleton } from 'tsyringe';
import * as dotenv from 'dotenv';
import { Worker, Job, Queue } from 'bullmq';
import { logger } from '../utils';
import { ExecutionService } from './execution.service';
import { redisConnection } from '../config';
import { QueueService } from './queue.service';
import { SubmissionResult } from '../types';

dotenv.config();

const JOB_QUEUE_NAME = process.env.JOB_QUEUE;
const SUCCESSFUL_JOB = process.env.SUCCESSFUL_JOB;
const FAILED_JOB = process.env.FAILED_JOB;

@injectable()
@singleton()
export class WorkerService {
  private worker: Worker;
  private resultQueue: Queue;

  constructor(
    private readonly executionService: ExecutionService,
    private queueService: QueueService
  ) {
    this.initializeWorker();
    this.resultQueue = this.queueService.getQueue();
  }

  private async initializeWorker() {
    let result: SubmissionResult;
    this.worker = new Worker(
      JOB_QUEUE_NAME,
      async (job: Job) => {
        try {
          logger.info(
            `Processing job id: ${job.id}, name: ${job.name}, submissionId: ${job.data.id}`
          );
          result = await this.executionService.processSubmission(job.data);
        } catch (error) {
          logger.error(
            `Error occurred while executing job with id: ${job.id}, submissionId: ${job.data.id}`
          );
          throw error;
        }
      },
      { connection: redisConnection, concurrency: 1 }
    );

    this.worker.on('completed', async (job) => {
      await this.resultQueue.add(SUCCESSFUL_JOB, { ...result });
      logger.info(
        `Job ${job.id} with submissionId:${job.data.id} completed successfully`
      );
    });

    this.worker.on('failed', async (job, err) => {
      await this.resultQueue.add(FAILED_JOB, { id: job?.data.id });
      logger.error(`Job ${job?.id} failed with error:`, err);
    });
  }

  public getWorker(): Worker {
    return this.worker;
  }
}
