import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { TokenType } from '../enums';
import { User } from '../../user/entities';
import { JwtPayload } from '../types';

const SEVEN_DAYS_IN_MILISECONDS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  setRefreshTokenCookie = (refreshToken: string, res: Response) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: SEVEN_DAYS_IN_MILISECONDS,
      secure: this.configService.get('NODE_ENV') !== 'development',
      domain: this.configService.get('COOKIES_DOMAIN'),
      sameSite: 'lax',
      priority: 'high',
    });
  };

  clearRefreshTokenCookie = (res: Response) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      domain: this.configService.get('COOKIES_DOMAIN'),
    });
  };

  async verifyToken(token: string, tokenType: TokenType) {
    try {
      const result = this.jwtService.verify(token, {
        secret: this.getTokenSecret(tokenType),
      });
      return result as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async generateAccessToken(user: User) {
    const accessToken = await this.generateToken(user, TokenType.ACCESS, '15m');
    return { accessToken };
  }

  async generateRefreshToken(user: User) {
    const refreshToken = await this.generateToken(user, TokenType.REFRESH, '7d');
    return { refreshToken };
  }

  async generateValidationToken(user: User) {
    const validationToken = await this.generateToken(user, TokenType.VALIDATION, '10m');
    return { validationToken };
  }

  private getTokenSecret(tokenType: TokenType) {
    const tokenToSecretMap: Record<TokenType, string> = {
      [TokenType.ACCESS]: 'ACCESS_TOKEN_JWT_SECRET',
      [TokenType.REFRESH]: 'REFRESH_TOKEN_JWT_SECRET',
      [TokenType.VALIDATION]: 'VALIDATION_TOKEN_JWT_SECRET',
    };

    return this.configService.get(tokenToSecretMap[tokenType]);
  }

  private async generateToken(
    user: User,
    tokenType: TokenType,
    expiresIn: string | number
  ) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.getTokenSecret(tokenType),
    });

    return token;
  }
}
