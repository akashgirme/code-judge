import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services';
import {
  SuccessMessageDto,
  VerifyTokenDto,
  RefreshedSessionDto,
  SignInDto,
  SignInWithOtpDto,
  SignedInUserResponseDto,
} from '../dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthProvider } from '../enums';
import { Throttle } from '@nestjs/throttler';

const RATE_LIMIT_TIME_IN_MILISECONDS = 30 * 1000;

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

  @Post('/initiate-sign-in')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @ApiOkResponse({ type: SuccessMessageDto })
  async signIn(@Body() body: SignInDto): Promise<SuccessMessageDto> {
    return this.authService.signIn(body);
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

  @Get('/refresh')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @ApiOkResponse({ type: SignedInUserResponseDto })
  @ApiOkResponse({ type: RefreshedSessionDto })
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshSession(req.cookies['refreshToken'], res);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    this.authService.logout(req.cookies['refreshToken'], res);
  }
}
