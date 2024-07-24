import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities';
import { AbilityModule } from '../ability/ability.module';
import { ProblemModule } from '../problem/problem.module';
import { SubmissionController } from './controllers/submission.controller';
import { SubmissionService } from './services/submission.service';
import { StorageModule } from '../object-store/storage.module';
import { HttpModule } from '@nestjs/axios';
import { VerifyCallbackMiddleware } from './middlewares';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    AbilityModule,
    ProblemModule,
    StorageModule,
    HttpModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyCallbackMiddleware).forRoutes('/callback');
  }
}
