import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { AuthCacheService, AuthService, TokenService, UserOtpService } from './services';
import { AuthController } from './controllers';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
    // forwardRef(() => UserModule),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserOtpService,
    TokenService,
    JwtStrategy,
    GoogleStrategy,
    AuthCacheService,
  ],
  exports: [JwtStrategy, GoogleStrategy, PassportModule],
})
export class AuthModule {}
