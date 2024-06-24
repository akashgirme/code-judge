import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/services';
import { JwtPayload } from '../types';
import { User } from '../../user/entities';
import { AuthCacheService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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

    let user = await this.cacheService.getUser(id);
    if (!user) user = await this.usersService.findAccountById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
