import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem, Topic } from './entities';
import { StorageModule } from '../object-store/storage.module';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from '../ability/ability.module';
import { ProblemService, TestCaseService, TopicService } from './services';
import { ProblemController, TopicController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { ExecutionModule } from '../execution/execution.module';
import { SolutionModule } from '../solution/solution.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Topic]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    AbilityModule,
    forwardRef(() => StorageModule),
    forwardRef(() => ExecutionModule),
    forwardRef(() => SolutionModule),
  ],
  controllers: [ProblemController, TopicController],
  providers: [ProblemService, TopicService, TestCaseService],
  exports: [ProblemService, TestCaseService],
})
export class ProblemModule {}
