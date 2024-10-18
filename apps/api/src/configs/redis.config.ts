import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import * as Bull from 'bullmq';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      url: configService.get('REDIS_URL'),
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};

export const getBullMQConfig = async (
  configService: ConfigService
): Promise<Bull.QueueOptions> => {
  return {
    connection: {
      url: configService.get<string>('REDIS_URL'),
    },
  };
};
