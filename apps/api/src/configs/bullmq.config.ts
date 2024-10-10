import { ConfigService } from '@nestjs/config';
import * as Bull from 'bullmq';
import Redis from 'ioredis';
import { IRedisUrl, parseRedisUrl } from 'parse-redis-url-simple';

export const getBullMqConfig = async (
  configService: ConfigService
): Promise<Bull.QueueOptions> => {
  // const redis: IRedisUrl[] = parseRedisUrl(configService.get<string>('REDIS_URL'));
  return {
    connection: {
      url: configService.get<string>('REDIS_URL'),
    },
  };
};
