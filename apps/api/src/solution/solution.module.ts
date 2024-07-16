import { Module } from '@nestjs/common';
import { AbilityModule } from '../ability/ability.module';
import { ProblemModule } from '../problem/problem.module';
import { StorageModule } from '../storage/storage.module';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';

@Module({
  imports: [AbilityModule, ProblemModule, StorageModule],
  controllers: [SolutionController],
  providers: [SolutionService],
})
export class SolutionModule {}
