import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from '../configs/typeorm.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../configs/redis.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.local`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
