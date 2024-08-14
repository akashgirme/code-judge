import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from '../configs/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../configs/redis.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from '../ability/ability.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ProblemModule } from '../problem/problem.module';
import { StorageModule } from '../object-store/storage.module';
import { SubmissionModule } from '../submission/submission.module';
import { SolutionModule } from '../solution/solution.module';
import { APP_GUARD } from '@nestjs/core';
import { ExecutionModule } from '../execution/execution.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.local`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => getTypeOrmConfig(configService),
    }),
    CacheModule.registerAsync(RedisOptions),
    ThrottlerModule.forRoot([
      {
        ttl: 30 * 1000,
        limit: 10,
      },
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('QUEUE_HOST'),
          port: parseInt(configService.get<string>('QUEUE_PORT')),
          username: configService.get<string>('QUEUE_USERNAME'),
          password: configService.get<string>('QUEUE_PASSWORD'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'CODE_EXECUTION',
      defaultJobOptions: {
        removeOnComplete: 10 * 1000,
        removeOnFail: 10 * 1000,
      },
    }),
    AbilityModule,
    AuthModule,
    UserModule,
    ProblemModule,
    StorageModule,
    SubmissionModule,
    SolutionModule,
    ExecutionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
