import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services';
import {
  SignedInUserDto,
  SuccessMessageDto,
  VerifyTokenDto,
  RefreshedSessionDto,
  SignInDto,
  SignInWithOtpDto,
} from '../dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthProvider } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { redirectUrl } = await this.authService.oAuthSignUp(req.user, {
      provider: AuthProvider.GOOGLE,
    });
    res.redirect(redirectUrl);
  }

  @Post('/sign-in')
  @ApiOkResponse({ type: SignedInUserDto })
  async signIn(@Body() body: SignInDto): Promise<SuccessMessageDto> {
    return this.authService.signIn(body);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  @Post('/sign-in-with-otp')
  async signInWithOtp(
    @Res() res: Response,
    @Body() body: SignInWithOtpDto
  ): Promise<void> {
    return this.authService.signInWithOtp(body, res);
  }

  @ApiOkResponse({ type: SignedInUserDto })
  @Post('/sign-in-with-token')
  async signInWithToken(
    @Res() res: Response,
    @Body() body: VerifyTokenDto
  ): Promise<void> {
    return this.authService.signInWithToken(body, res);
  }

  @Get('/refresh')
  @ApiOkResponse({ type: RefreshedSessionDto })
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshSession(req.cookies['refreshToken'], res);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    this.authService.logout(req.cookies['refreshToken'], res);
  }
}
