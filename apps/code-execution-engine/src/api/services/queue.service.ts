import { Queue, QueueOptions, Job, Worker } from 'bullmq';
import { injectable } from 'tsyringe';
import IORedis from 'ioredis';
import { QueueJobTypes, Queues } from '../enums';
import { HandleResultService } from './handle-result.service';

@injectable()
export class QueueService {
  private queues!: Record<string, Queue>;
  private connection: IORedis;
  private workersJobQueue!: Queue;
  private workersJobQueueWorker!: Worker;

  private static instance: QueueService;

  private static QUEUE_OPTIONS: Omit<QueueOptions, 'connection'> = {
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: false,
    },
  };

  constructor(private handleResultService: HandleResultService) {
    const redisUrl = process.env.REDIS_URL ?? '';
    const url = new URL(redisUrl);
    this.connection = new IORedis({
      host: url.hostname,
      port: parseInt(url.port),
      password: url.password,
      username: url.username,
      maxRetriesPerRequest: null,
    });
    if (QueueService.instance instanceof QueueService) {
      return QueueService.instance;
    }

    this.queues = {};
    QueueService.instance = this;

    this.instantiateQueues();
    this.instantiateworkersJobQueueWorkers();
  }

  async instantiateQueues() {
    const options: QueueOptions = {
      ...QueueService.QUEUE_OPTIONS,
      connection: this.connection,
    };

    this.workersJobQueue = new Queue(Queues.WORKERS_JOB_QUEUE, options);
    this.queues[Queues.WORKERS_JOB_QUEUE] = this.workersJobQueue;
  }

  getQueue(name: Queues) {
    return this.queues[name];
  }

  async instantiateworkersJobQueueWorkers() {
    this.workersJobQueueWorker = new Worker(
      Queues.WORKERS_JOB_QUEUE,
      async (job: Job) => {
        switch (job.name) {
          case QueueJobTypes.C_CODE_EXECUTION:
            break;
        }
      },
      { connection: this.connection }
    );

    this.workersJobQueueWorker.on('completed', (job: Job, value) => {
      console.log(
        `[${Queues.WORKERS_JOB_QUEUE}] Completed job \n
          With data: ${job.asJSON().data}\n
          ID: ${job.id}\n
          value: ${value}\n
        `
      );

      this.handleResultService.handleSuccessfulJob(job.data.id);
    });

    this.workersJobQueueWorker.on(
      'failed',
      (job: Job | undefined, error, prev: string) => {
        console.log(
          `[${Queues.WORKERS_JOB_QUEUE}] Failed job\n
          Data: ${job?.asJSON().data}\n
          ID: ${job?.id}\n
          value: ${error}\n,
          prev: ${prev}
        `
        );

        this.handleResultService.handleFailedJob(job?.data.id);
      }
    );
  }
}
