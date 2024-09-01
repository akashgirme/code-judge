import { Queue, QueueOptions } from 'bullmq';
import { injectable, singleton } from 'tsyringe';
import IORedis from 'ioredis';
import { Queues } from '../enums';

@injectable()
@singleton()
export class QueueService {
  private static instance: QueueService;

  private queues!: Record<string, Queue>;
  public connection: IORedis;

  private static QUEUE_OPTIONS: Omit<QueueOptions, 'connection'> = {
    defaultJobOptions: {
      removeOnComplete: true,
      // removeOnFail: true,
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

    const queueNames = [
      Queues.C_JOB_QUEUE,
      Queues.CPP_JOB_QUEUE,
      Queues.GO_JOB_QUEUE,
      Queues.JAVA_JOB_QUEUE,
      Queues.JS_JOB_QUEUE,
      Queues.RESULT_JOB_QUEUE,
    ];

    for (const queueName of queueNames) {
      this.queues[queueName] = new Queue(queueName, options);
    }
  }

  getQueue(name: Queues) {
    return this.queues[name];
  }
}
