import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities';
import { AbilityModule } from '../ability/ability.module';
import { ProblemModule } from '../problem/problem.module';
import { SubmissionController } from './controllers/submission.controller';
import { SubmissionService } from './services/submission.service';
import { StorageModule } from '../object-store/storage.module';
import { PassportModule } from '@nestjs/passport';
import { ExecutionModule } from '../execution/execution.module';
import { SolutionModule } from '../solution/solution.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AbilityModule,
    StorageModule,
    forwardRef(() => ProblemModule),
    forwardRef(() => ExecutionModule),
    forwardRef(() => SolutionModule),
    BullModule.registerQueue({
      name: 'CODE_EXECUTION',
      defaultJobOptions: {
        removeOnComplete: 10 * 1000,
        removeOnFail: 10 * 1000,
      },
    }),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
