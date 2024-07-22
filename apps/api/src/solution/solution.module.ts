import { Module } from '@nestjs/common';
import { AbilityModule } from '../ability/ability.module';
import { ProblemModule } from '../problem/problem.module';
import { StorageModule } from '../storage/storage.module';
import { SolutionController } from './controllers';
import { SolutionService } from './services';

@Module({
  imports: [AbilityModule, ProblemModule, StorageModule],
  controllers: [SolutionController],
  providers: [SolutionService],
  exports: [SolutionService],
})
export class SolutionModule {}
