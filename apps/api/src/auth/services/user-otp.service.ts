import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { generateOtp, hashOtp } from '../utility/generate-otp';
import { User } from '../../user/entities';
import { OtpDetails } from '../types';
import { AuthCacheService } from './auth-cache.service';

@Injectable()
export class UserOtpService {
  constructor(private cacheService: AuthCacheService) {}

  async createOtp(user: User) {
    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);

    const otpDetails: OtpDetails = {
      userId: user.id,
      otp: hashedOtp,
      otpAttempts: 0,
    };

    await this.cacheService.storeOtpDetailsInCache(otpDetails, user.id);

    return { otp };
  }

  async validateOtp(otp: string, user: User) {
    const otpDetails = await this.cacheService.fetchOtpDetailsFromCache(user.id);

    if (!otpDetails) {
      throw new BadRequestException('Otp expired! Please resend otp');
    }

    if (otpDetails.otpAttempts > 5) {
      throw new ForbiddenException('Too Many attempts! Please send new otp to continue.');
    }

    const match = await bcrypt.compare(otp, otpDetails.otp);

    otpDetails.otpAttempts++;
    await this.cacheService.storeOtpDetailsInCache(otpDetails, user.id);

    if (!match) {
      throw new BadRequestException('Incorrect otp');
    }
  }
}
