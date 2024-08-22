import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExecutionService } from './services';
import { ProblemModule } from '../problem/problem.module';
import { SubmissionModule } from '../submission/submission.module';
import { HttpModule } from '@nestjs/axios';
import { StorageModule } from '../object-store/storage.module';
import { ExecutionController } from './controllers';
import { VerifyCallbackMiddleware } from './middleware';

@Module({
  imports: [
    forwardRef(() => ProblemModule),
    forwardRef(() => SubmissionModule),
    StorageModule,
    HttpModule,
  ],
  controllers: [ExecutionController],
  providers: [ExecutionService],
  exports: [ExecutionService],
})
export class ExecutionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyCallbackMiddleware).forRoutes('/callback');
  }
}
