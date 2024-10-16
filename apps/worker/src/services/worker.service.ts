import { injectable, singleton } from 'tsyringe';
import * as dotenv from 'dotenv';
import { Worker, Job, Queue } from 'bullmq';
import { logger } from '../utils';
import { ExecutionService } from './execution.service';
import { Config, redisConnection } from '../config';

dotenv.config();

@injectable()
@singleton()
export class WorkerService {
  private worker: Worker;
  private resultQueue: Queue;

  constructor(private readonly executionService: ExecutionService) {
    this.initializeWorker();
  }

  private async initializeWorker() {
    this.worker = new Worker(
      Config.JobQueueName,
      async (job: Job) => {
        try {
          logger.info(
            `Processing job id: ${job.id}, name: ${job.name}, submissionId: ${job.data}`
          );
          await this.executionService.processSubmission(job.data);
        } catch (error) {
          logger.error(
            `Error occurred while executing job with id: ${job.id}, submissionId: ${job.data}`
          );
          throw error;
        }
      },
      { connection: redisConnection, concurrency: 1 }
    );
  }

  public getWorker(): Worker {
    return this.worker;
  }
}
