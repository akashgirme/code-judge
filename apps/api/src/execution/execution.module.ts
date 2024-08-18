import { forwardRef, Module } from '@nestjs/common';
import { ExecutionService } from './services';
import { ProblemModule } from '../problem/problem.module';
import { SubmissionModule } from '../submission/submission.module';
import { HttpModule } from '@nestjs/axios';
import { StorageModule } from '../object-store/storage.module';

@Module({
  imports: [
    forwardRef(() => ProblemModule),
    forwardRef(() => SubmissionModule),
    StorageModule,
    HttpModule,
  ],
  controllers: [],
  providers: [ExecutionService],
  exports: [],
})
export class ExecutionModule {}
