import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';

import {
  SignInUserDto,
  ResendVerificationEmailDto,
  OAuthSignUpDto,
  AuthProviderDto,
  VerifyOtpDto,
  VerifyTokenDto,
} from '../dto';
import { ConfigService } from '@nestjs/config';
import { UserOtpService } from './user-otp.service';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { TokenService } from './token.service';
import { verifyEmailWithOtpMjml } from '../../mail/mjml';
import { User } from '../../user/entities';
import { UserService } from '../../user/services';
import { AuthProvider, TokenType } from '../types';
import { AuthCacheService } from './auth-cache.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private otpService: UserOtpService,
    private mailService: MailService,
    private configService: ConfigService,
    private tokenService: TokenService,
    private cacheservice: AuthCacheService
  ) {}

  async signIn({ email }: SignInUserDto) {
    const user = await this.usersService.findAccountByEmail(email);
    if (!user) {
      await this.signUp(email);
    }

    const { otp } = await this.otpService.createOtp(user);
    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const validationUrl = `${this.configService.get(
      'AUTH_UI_URL'
    )}/sign-in-with-token?token=${validationToken}`;

    //TODO: Date is in ISO seconds format, Convert it to normal string
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

  async signUp(email: string) {
    const user = await this.usersService.create({
      email,
      provider: AuthProvider.EMAIL,
    });

    console.log(user);

    const { otp } = await this.otpService.createOtp(user);
    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const validationUrl = `${this.configService.get(
      'AUTH_UI_URL'
    )}/sign-in-with-token?token=${validationToken}`;

    await this.mailService.sendMail({
      to: email,
      subject: `Secure link to log in to example.com | ${new Date().toLocaleString()}`,
      htmlBody: verifyEmailWithOtpMjml,
      data: { otp, validationUrl },
    });

    return {
      message: `To continue click the link send to ${email} or enter otp`,
    };
  }

  async resendVerificationEmail({ email }: ResendVerificationEmailDto) {
    const user = await this.usersService.findAccountByEmail(email);

    if (!user) {
      throw new NotFoundException(`No User found with email ${email}`);
    }

    const { otp } = await this.otpService.createOtp(user);
    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const validationUrl = `${this.configService.get(
      'AUTH_UI_URL'
    )}/sign-in-with-token?token=${validationToken}`;

    await this.mailService.sendMail({
      to: email,
      subject: `Secure link to log in to example.com | ${Date.now().toString()} `,
      htmlBody: verifyEmailWithOtpMjml,
      data: { otp, validationUrl },
    });

    return {
      message: `We have resent the email with login link. Please check your email ${email}`,
    };
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

  async signInWithOtp({ email, otp }: VerifyOtpDto, res: Response) {
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

      if (!user) {
        throw new UnauthorizedException('Invalid Token');
      }

      const { refreshToken: newRefreshToken } =
        await this.tokenService.generateRefreshToken(user);

      this.tokenService.setRefreshTokenCookie(newRefreshToken, res);

      await this.cacheservice.setRefreshToken(newRefreshToken, user);

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
    await this.cacheservice.clearRefreshToken(user);

    return res.status(200).json({ message: 'Successfully logged out' });
  }

  private async authenticateUser(user: User, res: Response) {
    const { accessToken } = await this.tokenService.generateAccessToken(user);
    const { refreshToken } = await this.tokenService.generateRefreshToken(user);

    // TODO: Hash the token before saving into DB
    await this.cacheservice.setRefreshToken(refreshToken, user);

    this.tokenService.setRefreshTokenCookie(refreshToken, res);

    await this.cacheservice.setUser(user);

    const safeUser = instanceToPlain(user);

    res.json({ accessToken, user: safeUser });
  }
}
