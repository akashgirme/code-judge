import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExecutionController } from './controllers';
import { ExecutionService } from './services';
import { ProblemModule } from '../problem/problem.module';
import { SolutionModule } from '../solution/solution.module';
import { SubmissionModule } from '../submission/submission.module';
import { HttpModule } from '@nestjs/axios';
import { VerifyCallbackMiddleware } from './middlewares';

@Module({
  imports: [
    forwardRef(() => ProblemModule),
    forwardRef(() => SolutionModule),
    forwardRef(() => SubmissionModule),
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
