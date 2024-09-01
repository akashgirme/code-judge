import * as dotenv from 'dotenv';
import IORedis from 'ioredis';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

const url = new URL(REDIS_URL);
export const redisConnection = new IORedis({
  host: url.hostname,
  port: parseInt(url.port),
  password: url.password,
  username: url.username,
  maxRetriesPerRequest: null,
});
