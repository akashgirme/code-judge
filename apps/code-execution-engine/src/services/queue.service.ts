import { Queue, QueueOptions, Job, Worker } from 'bullmq';
import { injectable } from 'tsyringe';
import IORedis from 'ioredis';
import { CodeExecutionQueueJobTypes, Queues } from '../enums';
import { ExecutionService } from './execution.service';

@injectable()
export class QueueService {
  private queues: Record<string, Queue>;
  private connection: IORedis;
  private codeExecutionQueue: Queue;
  private codeExecutionQueueWorker: Worker;

  private static instance: QueueService;

  private static QUEUE_OPTIONS: Omit<QueueOptions, 'connection'> = {
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: false,
    },
  };

  constructor(private executionService: ExecutionService) {
    const redisUrl = process.env.REDIS_URL;
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
    this.instantiateCodeExecutionQueueWorkers();
  }

  async instantiateQueues() {
    const options: QueueOptions = {
      ...QueueService.QUEUE_OPTIONS,
      connection: this.connection,
    };

    this.codeExecutionQueue = new Queue(Queues.CODE_EXECUTION, options);
    this.queues[Queues.CODE_EXECUTION] = this.codeExecutionQueue;
  }

  getQueue(name: Queues) {
    return this.queues[name];
  }

  async instantiateCodeExecutionQueueWorkers() {
    this.codeExecutionQueueWorker = new Worker(
      Queues.CODE_EXECUTION,
      async (job: Job) => {
        switch (job.name) {
          case CodeExecutionQueueJobTypes.EXECUTE_CODE:
            await this.executionService.executeCode(job.data);
            break;
        }
      },
      { connection: this.connection }
    );

    this.codeExecutionQueueWorker.on('completed', (job: Job, value) => {
      console.log(
        `[${Queues.CODE_EXECUTION}] Completed job with data\n
          Data: ${job.asJSON().data}\n
          ID: ${job.id}\n
          value: ${value}\n
        `
      );
    });

    this.codeExecutionQueueWorker.on('failed', (job: Job, value) => {
      console.log(
        `[${Queues.CODE_EXECUTION}] Failed job with data\n
          Data: ${job.asJSON().data}\n
          ID: ${job.id}\n
          value: ${value}\n
        `
      );
    });
  }
}
