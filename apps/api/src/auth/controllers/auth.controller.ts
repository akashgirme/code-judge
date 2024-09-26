import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services';
import {
  SuccessMessageDto,
  VerifyTokenDto,
  RefreshedSessionDto,
  SignInWithOtpDto,
  SignedInUserResponseDto,
  VerificationEmailSentDto,
  SignUpUserDto,
  ResendVerificationEmailDto,
  VerifyEmailDto,
  SignInUserDto,
  RequestSignInWithOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '../dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthProvider } from '../enums';
import { Throttle } from '@nestjs/throttler';

const RATE_LIMIT_TIME_IN_MILISECONDS = 30 * 1000;

//TODO: Controller to check username exists or not.

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @Throttle({ default: { limit: 3, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    //
  }

  @Get('google/callback')
  @Throttle({ default: { limit: 3, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { redirectUrl } = await this.authService.oAuthSignUp(req.user, {
      provider: AuthProvider.GOOGLE,
    });
    res.redirect(redirectUrl);
  }

  @ApiOkResponse({ type: VerificationEmailSentDto })
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @Post('/sign-up')
  async signUp(@Body() body: SignUpUserDto): Promise<VerificationEmailSentDto> {
    return this.authService.signUp(body);
  }

  @ApiOkResponse({ type: VerificationEmailSentDto })
  @Throttle({ default: { limit: 2, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @Post('/resend-verification-email')
  async resendVerificationEmail(
    @Body() body: ResendVerificationEmailDto
  ): Promise<VerificationEmailSentDto> {
    return this.authService.resendVerificationEmail(body);
  }

  @ApiOkResponse({ type: SignedInUserResponseDto })
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @Post('/verify-email')
  async verifyEmail(@Res() res: Response, @Body() body: VerifyEmailDto): Promise<void> {
    return this.authService.verifyEmail(body, res);
  }

  @Post('/sign-in')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @ApiOkResponse({ type: SignedInUserResponseDto })
  async signIn(@Res() res: Response, @Body() body: SignInUserDto): Promise<void> {
    return this.authService.signIn(body, res);
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Throttle({ default: { limit: 1, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @Post('/request-sign-in-otp')
  async requestSignInOtp(
    @Body() body: RequestSignInWithOtpDto
  ): Promise<SuccessMessageDto> {
    return this.authService.requestSignInOtp(body);
  }

  @Post('/sign-in-with-otp')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @ApiOkResponse({ type: SignedInUserResponseDto })
  async signInWithOtp(
    @Res() res: Response,
    @Body() body: SignInWithOtpDto
  ): Promise<void> {
    return this.authService.signInWithOtp(body, res);
  }

  @Post('/sign-in-with-token')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @ApiOkResponse({ type: SignedInUserResponseDto })
  async signInWithToken(
    @Res() res: Response,
    @Body() body: VerifyTokenDto
  ): Promise<void> {
    return this.authService.signInWithToken(body, res);
  }

  @ApiOkResponse({ type: SuccessMessageDto })
  @Throttle({ default: { limit: 1, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<SuccessMessageDto> {
    return this.authService.forgotPassword(body);
  }

  @ApiOkResponse({ type: String })
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @Post('/reset-password')
  async resetPassword(
    @Body() body: ResetPasswordDto,
    @Res() res: Response
  ): Promise<void> {
    return this.authService.resetPassword(body, res);
  }

  @Get('/refresh')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @ApiOkResponse({ type: RefreshedSessionDto })
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshSession(req.cookies['refreshToken'], res);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req.cookies['refreshToken'], res);
  }
}
