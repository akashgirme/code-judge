import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { AbilityModule } from '../ability/ability.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    AbilityModule,
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
