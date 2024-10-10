import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { getBullMqConfig } from '../configs/bullmq.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubmissionQueueEvents } from './submission-queue.service';
import { DbWritesService } from './db-writes.service';
import { SubmissionModule } from '../submission/submission.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => getBullMqConfig(configService),
    }),
    BullModule.registerQueue({
      name: 'submission',
    }),
    BullModule.registerQueue({
      name: 'addSubmissionToDB',
    }),
    forwardRef(() => SubmissionModule),
  ],
  controllers: [],
  providers: [SubmissionQueueEvents, DbWritesService],
  exports: [BullModule],
})
export class QueueModule {}
