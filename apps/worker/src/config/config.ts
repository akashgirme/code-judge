import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  RedisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  JobQueueName: process.env.QUEUE_NAME ?? 'submission',
};
