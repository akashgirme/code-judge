import { injectable, singleton } from 'tsyringe';
import { Worker, Job } from 'bullmq';
import { ExecutionService } from './execution.service';
import { Config, redisConnection } from '../config';

@injectable()
@singleton()
export class WorkerService {
  private worker: Worker;
  constructor(private readonly executionService: ExecutionService) {
    this.initializeWorker();
  }

  private async initializeWorker() {
    console.log('submission queue name.....', Config.JobQueueName);
    this.worker = new Worker(
      Config.JobQueueName,
      async (job: Job) => {
        try {
          console.info(
            `Processing job id: ${job.id}, name: ${job.name}, submissionId: ${job.data}`
          );
          await this.executionService.processSubmission(job.data);
        } catch (error) {
          console.error(
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
