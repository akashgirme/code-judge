import { forwardRef, Module } from '@nestjs/common';
import { AbilityModule } from '../ability/ability.module';
import { ProblemModule } from '../problem/problem.module';
import { StorageModule } from '../object-store/storage.module';
import { SolutionController } from './controllers';
import { SolutionService } from './services';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    forwardRef(() => AbilityModule),
    forwardRef(() => ProblemModule),
    forwardRef(() => StorageModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SolutionController],
  providers: [SolutionService],
  exports: [],
})
export class SolutionModule {}
