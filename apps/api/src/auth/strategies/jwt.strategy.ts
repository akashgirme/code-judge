import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/services';
import { JwtPayload } from '../types';
import { User } from '../../user/entities';
import { AuthCacheService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    private cacheService: AuthCacheService
  ) {
    super({
      secretOrKey: configService.get('ACCESS_TOKEN_JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    let user: User | null = await this.cacheService.fetchUserFromCache(id);
    if (!user) {
      this.logger.log('User Cache Miss');
      user = await this.usersService.findAccountById(id);
      if (user !== null) {
        await this.cacheService.setUserCache(user);
      }
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
