import { Queue } from 'bullmq';
import * as dotenv from 'dotenv';
import { injectable, singleton } from 'tsyringe';
import { redisConnection } from '../config';

dotenv.config();

const RESULT_JOB_QUEUE = process.env.RESULT_JOB_QUEUE ?? 'redis://localhost:6379';

@injectable()
@singleton()
export class QueueService {
  private resultQueue: Queue;
  static instance: QueueService | null = null;

  constructor() {
    if (QueueService.instance) {
      return QueueService.instance;
    }
    this.initailizeQueue();
    QueueService.instance = this;
  }

  private initailizeQueue() {
    this.resultQueue = new Queue(RESULT_JOB_QUEUE, {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    });
  }

  public getQueue(): Queue {
    return this.resultQueue;
  }
}
