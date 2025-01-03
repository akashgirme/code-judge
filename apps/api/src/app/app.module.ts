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
import { QueueModule } from '../queue/queue.module';

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
        ttl: 30 * 1000, // 30s
        limit: 10,
      },
    ]),
    QueueModule,
    AbilityModule,
    AuthModule,
    UserModule,
    ProblemModule,
    StorageModule,
    SubmissionModule,
    SolutionModule,
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
