import { injectable, singleton } from 'tsyringe';
import { Job, Worker } from 'bullmq';
import { ResultService } from './result.service';
import { Queues, ResultQueueJobType } from '../enums';
import { logger } from '../utils';
import { redisConnection } from '../config';

@injectable()
@singleton()
export class WorkerService {
  private worker: Worker;

  constructor(private readonly resultService: ResultService) {
    this.initializeWorker();
  }

  private async initializeWorker() {
    this.worker = new Worker(
      Queues.RESULT_JOB_QUEUE,
      async (job: Job) => {
        switch (job.name) {
          case ResultQueueJobType.SUCCESSFUL_JOB:
            this.resultService.handleSuccessfulJob(job.data);
            break;
          case ResultQueueJobType.FAILED_JOB:
            this.resultService.handleFailedJob(job.data);
            break;
          default:
            throw new Error(`Job is not defined: ${job.name}`);
        }
      },
      { connection: redisConnection }
    );

    this.worker.on('completed', async (job) => {
      logger.info(
        `Job ${job.id} with submissionId:${job.data.id} completed successfully`
      );
    });

    this.worker.on('failed', async (job, err) => {
      logger.error(`Job ${job?.id} failed with error:`, err);
    });
  }

  public getWorker(): Worker {
    return this.worker;
  }
}
