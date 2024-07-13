import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from '../configs/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../configs/redis.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from '../ability/ability.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProblemModule } from '../problem/problem.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.local`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => getTypeOrmConfig(configService),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CacheModule.registerAsync(RedisOptions),
    ThrottlerModule.forRoot([
      {
        ttl: 30 * 1000,
        limit: 10,
      },
    ]),
    AbilityModule,
    AuthModule,
    UserModule,
    ProblemModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
