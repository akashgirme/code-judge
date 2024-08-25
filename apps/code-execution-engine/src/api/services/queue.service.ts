import { Queue, QueueOptions } from 'bullmq';
import { injectable, singleton } from 'tsyringe';
import IORedis from 'ioredis';
import { Queues } from '../enums';

@injectable()
@singleton()
export class QueueService {
  private queues!: Record<string, Queue>;
  public connection: IORedis;
  private workersJobQueue!: Queue;
  private workersResultJobQueue!: Queue;
  private static instance: QueueService;

  private static QUEUE_OPTIONS: Omit<QueueOptions, 'connection'> = {
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
  };

  constructor() {
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
  }

  async instantiateQueues() {
    const options: QueueOptions = {
      ...QueueService.QUEUE_OPTIONS,
      connection: this.connection,
    };

    this.workersJobQueue = new Queue(Queues.WORKERS_JOB_QUEUE, options);
    this.queues[Queues.WORKERS_JOB_QUEUE] = this.workersJobQueue;

    this.workersResultJobQueue = new Queue(Queues.WORKERS_RESULT_JOB_QUEUE, options);
    this.queues[Queues.WORKERS_RESULT_JOB_QUEUE] = this.workersResultJobQueue;
  }

  getQueue(name: Queues) {
    return this.queues[name];
  }
}
