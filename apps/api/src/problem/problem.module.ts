import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem, Topic } from './entities';
import { StorageModule } from '../object-store/storage.module';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from '../ability/ability.module';
import { ProblemService, TestCaseService, TopicService } from './services';
import { ProblemController, TopicController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Topic]),
    AuthModule,
    AbilityModule,
    StorageModule,
  ],
  controllers: [ProblemController, TopicController],
  providers: [ProblemService, TopicService, TestCaseService],
  exports: [ProblemService],
})
export class ProblemModule {}
