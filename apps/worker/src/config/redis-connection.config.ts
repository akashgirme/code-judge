import * as dotenv from 'dotenv';
import IORedis from 'ioredis';
import { createClient, RedisClientOptions } from 'redis';
import { Config } from './config';

const url = new URL(Config.RedisUrl);
export const redisConnection = new IORedis({
  host: url.hostname,
  port: parseInt(url.port),
  password: url.password,
  username: url.username,
  maxRetriesPerRequest: null,
});

export const redisClient = createClient({
  url: Config.RedisUrl,
});

redisClient.connect();
