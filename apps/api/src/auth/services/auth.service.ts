import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailService } from '../../mail/mail.service';

import {
  ResendVerificationEmailDto,
  OAuthSignUpDto,
  AuthProviderDto,
  VerifyTokenDto,
  SignInWithOtpDto,
  InitiateSignInDto,
} from '../dto';
import { ConfigService } from '@nestjs/config';
import { UserOtpService } from './user-otp.service';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { TokenService } from './token.service';
import { verifyEmailWithOtpMjml } from '../../mail/mjml';
import { User } from '../../user/entities';
import { UserService } from '../../user/services';
import { AuthProvider, TokenType } from '../enums';
import { AuthCacheService } from './auth-cache.service';
import { decrypt, encrypt } from '../utility/hash-jwt-token';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private usersService: UserService,
    private otpService: UserOtpService,
    private mailService: MailService,
    private configService: ConfigService,
    private tokenService: TokenService,
    private cacheservice: AuthCacheService
  ) {}

  async signIn({ email }: InitiateSignInDto) {
    let user = await this.usersService.findAccountByEmail(email);

    if (!user) {
      this.logger.log('User not found! Creating new user.');
      user = await this.usersService.create({
        email,
        provider: AuthProvider.EMAIL,
        hasOnborded: false,
      });
    }

    const { otp } = await this.otpService.createOtp(user);
    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const validationUrl = `${this.configService.get(
      'AUTH_UI_URL'
    )}/sign-in-with-token?token=${validationToken}`;

    console.log('validation URL', validationUrl);

    await this.mailService.sendMail({
      to: email,
      subject: `Secure link to log in to example.com | ${new Date().toLocaleString()} `,
      htmlBody: verifyEmailWithOtpMjml,
      data: { otp, validationUrl },
    });

    return {
      message: `To continue click the link send to ${email} or enter otp`,
    };
  }

  async oAuthSignUp(
    { email, firstName, lastName }: OAuthSignUpDto,
    { provider }: AuthProviderDto
  ) {
    const existingUser = await this.usersService.findAccountByEmail(email);

    if (existingUser) {
      const { validationToken } = await this.tokenService.generateValidationToken(
        existingUser
      );

      if (firstName !== existingUser.firstName || lastName !== existingUser.lastName) {
        this.usersService.editProfile(existingUser, { firstName, lastName });
      }

      const redirectUrl = `${this.configService.get(
        'AUTH_UI_URL'
      )}/sign-in-with-token?token=${validationToken}`;
      return { redirectUrl };
    }

    const user = await this.usersService.create({
      firstName,
      lastName,
      email,
      provider,
      hasOnborded: true,
    });

    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const redirectUrl = `${this.configService.get(
      'AUTH_UI_URL'
    )}/sign-in-with-token?token=${validationToken}`;

    return { redirectUrl };
  }

  async signInWithToken({ verificationToken }: VerifyTokenDto, res: Response) {
    const { id } = await this.tokenService.verifyToken(
      verificationToken,
      TokenType.VALIDATION
    );

    const user = await this.usersService.findAccountById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.authenticateUser(user, res);
  }

  async signInWithOtp({ email, otp }: SignInWithOtpDto, res: Response) {
    const user = await this.usersService.findAccountByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.otpService.validateOtp(otp, user);

    await this.authenticateUser(user, res);
  }

  async refreshSession(refreshToken: string, res: Response) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Missing Refresh Token');
      }

      const { id } = await this.tokenService.verifyToken(refreshToken, TokenType.REFRESH);

      const user = await this.usersService.findAccountById(id);

      const retrievedRefreshToken = await this.cacheservice.retrieveRefreshTokenFromCache(
        user.id
      );
      const decrypedRefreshToken = decrypt(retrievedRefreshToken);

      if (!user || decrypedRefreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid Token');
      }

      const { refreshToken: newRefreshToken } =
        await this.tokenService.generateRefreshToken(user);

      this.tokenService.setRefreshTokenCookie(newRefreshToken, res);
      await this.cacheservice.storeRefreshTokenInCache(newRefreshToken, user.id);
      await this.cacheservice.setUserCache(user);

      const { accessToken } = await this.tokenService.generateAccessToken(user);

      res.json({ accessToken });
    } catch (error) {
      this.tokenService.clearRefreshTokenCookie(res);
      throw error;
    }
  }

  async logout(refreshToken: string, res: Response) {
    if (!refreshToken) {
      return res.status(200).json({ message: 'Successfully logged out' });
    }

    const { id } = await this.tokenService.verifyToken(refreshToken, TokenType.REFRESH);

    const user = await this.usersService.findAccountById(id);

    if (!user) {
      this.tokenService.clearRefreshTokenCookie(res);
      return res.status(200).json({ message: 'Successfully logged out' });
    }

    this.tokenService.clearRefreshTokenCookie(res);
    await this.cacheservice.removeRefreshTokenFromCache(user.id);

    return res.status(200).json({ message: 'Successfully logged out' });
  }

  private async authenticateUser(user: User, res: Response) {
    const { accessToken } = await this.tokenService.generateAccessToken(user);
    const { refreshToken } = await this.tokenService.generateRefreshToken(user);

    const encryptedRefreshToken = encrypt(refreshToken);
    await this.cacheservice.storeRefreshTokenInCache(encryptedRefreshToken, user.id);

    this.tokenService.setRefreshTokenCookie(refreshToken, res);

    await this.cacheservice.setUserCache(user);

    const safeUser = instanceToPlain(user);

    res.json({ accessToken, user: safeUser });
  }
}
