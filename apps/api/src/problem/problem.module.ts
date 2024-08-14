import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem, Tag } from './entities';
import { StorageModule } from '../object-store/storage.module';
import { AuthModule } from '../auth/auth.module';
import { AbilityModule } from '../ability/ability.module';
import { ProblemService, TagService, TestCaseService } from './services';
import { ProblemController, TagController } from './controllers';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Tag]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    AbilityModule,
    StorageModule,
  ],
  controllers: [ProblemController, TagController],
  providers: [ProblemService, TagService, TestCaseService],
  exports: [ProblemService, TestCaseService],
})
export class ProblemModule {}
