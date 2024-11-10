import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import * as bcrypt from 'bcrypt';
import {
  OAuthSignUpDto,
  AuthProviderDto,
  VerifyTokenDto,
  SignInWithOtpDto,
  SignInUserDto,
  SignUpUserDto,
  ResendVerificationEmailDto,
  VerifyEmailDto,
  RequestSignInWithOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  CheckUsernameDto,
  UsernameAvailabilityDto,
} from '../dto';
import { ConfigService } from '@nestjs/config';
import { UserOtpService } from './user-otp.service';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { TokenService } from './token.service';
import { resetPasswordLinkMjml, verifyEmailWithOtpMjml } from '../../mail/mjml';
import { User } from '../../user/entities';
import { UserService } from '../../user/services';
import { AuthProvider, TokenType } from '../enums';
import { AuthCacheService } from './auth-cache.service';
import { decrypt, encrypt } from '../utility/hash-jwt-token';
import {
  extractUsername,
  generatePassword,
  generateUsername,
  hashPassword,
} from '../utility';
import { hashToken } from '../utility/hash-token';

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

  async oAuthSignUp(
    { email, firstName, lastName }: OAuthSignUpDto,
    { provider }: AuthProviderDto
  ) {
    const existingUser = await this.usersService.findVerifiedAccountByEmail(email);

    if (existingUser) {
      const { validationToken } = await this.tokenService.generateValidationToken(
        existingUser
      );

      if (firstName !== existingUser.firstName || lastName !== existingUser.lastName) {
        await this.usersService.editProfile(existingUser, { firstName, lastName });
      }

      const redirectUrl = `${this.configService.get(
        'AUTH_UI_URL'
      )}/sign-in-with-token?token=${validationToken}`;
      return { redirectUrl };
    }

    const generatedPassword = generatePassword(16);

    const hashedPassword = await hashPassword(generatedPassword);

    // Extract username form email
    let username = extractUsername(email);

    const existingUserWithUsername = await this.usersService.findUserByUsername(username);

    // If username exists then generate unique username;
    if (!username || existingUserWithUsername) {
      this.logger.log(
        'OAuth Login: Username extracted from email already exists, Generating new username...'
      );
      username = await this.getUniqueUsername(firstName.toLocaleLowerCase());
    }

    const user = await this.usersService.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      provider,
      hasOnborded: true,
    });

    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const redirectUrl = `${this.configService.get(
      'AUTH_UI_URL'
    )}/sign-in-with-token?token=${validationToken}`;

    //TODO: Send Welcome Mail (add task in message queue)
    return { redirectUrl };
  }

  async signUp({ username, email, password }: SignUpUserDto) {
    const existingUser = await this.usersService.findVerifiedAccountByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const existingUserWithUsername = await this.usersService.findUserByUsername(username);

    if (existingUserWithUsername) {
      throw new BadRequestException('username is already taken');
    }

    const hashedPassword = await hashPassword(password);

    console.log('username & email: ', username, email);

    const user = await this.usersService.create({
      username: username,
      email: email,
      password: hashedPassword,
      provider: AuthProvider.EMAIL,
    });

    const { otp } = await this.otpService.createOtp(user);

    //TODO: Queue sendMail job instead of awaiting here
    await this.mailService.sendMail({
      to: email,
      subject: 'Verify your email for Code-Judge',
      htmlBody: verifyEmailWithOtpMjml,
      data: { firstName: username, otp },
    });

    return {
      userId: user.id,
      email,
      message: `You have been successfully registered! Please check your email ${email} for a otp`,
    };
  }

  async resendVerificationEmail({ userId, email }: ResendVerificationEmailDto) {
    const existingUser = await this.usersService.findAccountById(userId);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (existingUser.email !== email) {
      throw new BadRequestException('Email does not match');
    }

    const alreadyVerifiedAccount = await this.usersService.findVerifiedAccountByEmail(
      email
    );

    if (alreadyVerifiedAccount) {
      throw new BadRequestException('Email is already verified. Please login instead');
    }

    const { otp } = await this.otpService.createOtp(existingUser);

    await this.mailService.sendMail({
      to: email,
      subject: 'Verify your email for Code-Judge',
      htmlBody: verifyEmailWithOtpMjml,
      data: { firstName: existingUser.username, otp },
    });

    return {
      message: `We have resent the otp! Please check your email ${email} for a otp`,
      email,
      userId: existingUser.id,
    };
  }

  async verifyEmail({ userId, email, otp }: VerifyEmailDto, res: Response) {
    const user = await this.usersService.findAccountByEmailAndId(userId, email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('User already verified');
    }

    await this.otpService.validateOtp(otp, user);

    await this.usersService.setVerifyTrue(userId);

    await this.authenticateUser(user, res);

    //TODO: Send Welcome email
  }

  async signIn({ email, password }: SignInUserDto, res: Response) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);
    if (!user) {
      throw new NotFoundException('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('Incorrect email or password');
    }

    await this.authenticateUser(user, res);
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

  async requestSignInOtp({ email }: RequestSignInWithOtpDto) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found for given email');
    }

    const { otp } = await this.otpService.createOtp(user);

    await this.mailService.sendMail({
      to: email,
      subject: 'Your Sign in OTP for Code-Judge',
      htmlBody: verifyEmailWithOtpMjml,
      data: { firstName: user.username, otp },
    });

    return {
      message: `Please check your email ${email} for a otp`,
    };
  }

  async signInWithOtp({ email, otp }: SignInWithOtpDto, res: Response) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.otpService.validateOtp(otp, user);

    await this.authenticateUser(user, res);
  }

  // TODO: This is not stable often times get 'Invalid Token' error
  async refreshSession(refreshToken: string, res: Response) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Missing Refresh Token');
      }

      const { id } = await this.tokenService.verifyToken(refreshToken, TokenType.REFRESH);

      const user = await this.usersService.findAccountById(id);

      const hashRefreshToken = await this.cacheservice.retrieveRefreshTokenFromCache(
        user.id
      );

      const match = await bcrypt.compare(refreshToken, hashRefreshToken);
      // const decrypedRefreshToken = decrypt(retrievedRefreshToken);

      if (!user || !match) {
        throw new UnauthorizedException('Invalid Token');
      }

      const { refreshToken: newRefreshToken } =
        await this.tokenService.generateRefreshToken(user);

      await this.cacheservice.storeRefreshTokenInCache(newRefreshToken, user.id);
      await this.cacheservice.setUserCache(user);

      this.tokenService.setRefreshTokenCookie(newRefreshToken, res);

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

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findVerifiedAccountByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found for given email');
    }

    const { validationToken } = await this.tokenService.generateValidationToken(user);

    const resetPasswordLink = `${this.configService.get(
      'AUTH_UI_URL'
    )}/reset-password?token=${validationToken}`;

    await this.mailService.sendMail({
      to: email,
      subject: 'Reset your SkillStreet Password',
      htmlBody: resetPasswordLinkMjml,
      data: { firstName: user.username, resetPasswordLink },
    });

    return {
      message: `Please check your email ${email} for a password reset link`,
    };
  }

  async resetPassword({ verificationToken, password }: ResetPasswordDto, res: Response) {
    const { id } = await this.tokenService.verifyToken(
      verificationToken,
      TokenType.VALIDATION
    );

    const user = await this.usersService.findVerifiedAccountById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await hashPassword(password);
    await this.usersService.updatePassword(id, hashedPassword);

    res.json({
      message:
        'Password Reset Successfully! Please proceed to log in with your updated credentials.',
    });
  }

  private async authenticateUser(user: User, res: Response) {
    const { accessToken } = await this.tokenService.generateAccessToken(user);
    const { refreshToken } = await this.tokenService.generateRefreshToken(user);

    // const encryptedRefreshToken = encrypt(refreshToken);
    const hashedRefreshToken = await hashToken(refreshToken);
    await this.cacheservice.storeRefreshTokenInCache(hashedRefreshToken, user.id);

    await this.cacheservice.setUserCache(user);

    this.tokenService.setRefreshTokenCookie(refreshToken, res);

    const safeUser = instanceToPlain(user);

    res.json({ accessToken, user: safeUser });
  }

  async checkUsernameAvailability({
    username,
  }: CheckUsernameDto): Promise<UsernameAvailabilityDto> {
    const user = await this.usersService.findUserByUsername(username);

    if (user) {
      return { available: false };
    }

    return { available: true };
  }

  private async getUniqueUsername(baseUsername: string): Promise<string> {
    let username = baseUsername;
    let existingUserWithUsername = await this.usersService.findUserByUsername(username);

    while (existingUserWithUsername) {
      username = generateUsername(baseUsername); // Generate a new username
      existingUserWithUsername = await this.usersService.findUserByUsername(username);
    }

    return username; // Return the unique username
  }
}
