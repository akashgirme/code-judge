import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { generateOtp, hashOtp } from '../utility/generate-otp';
import { User } from '../../user/entities';
import { AuthCacheService } from './auth-cache.service';
import { OtpDetails } from '../types';

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
      throw new ForbiddenException('OTP expired! Please resend OTP');
    }

    if (otpDetails.otpAttempts >= 5) {
      console.log(otpDetails.otpAttempts);
      await this.cacheService.deleteOptDetailsFromCache(otpDetails.userId);
      throw new ForbiddenException('Too Many Attempts, Please send new OTP to continue.');
    }

    const match = await bcrypt.compare(otp, otpDetails.otp);

    otpDetails.otpAttempts++;
    await this.cacheService.storeOtpDetailsInCache(otpDetails, user.id);

    if (!match) {
      throw new ForbiddenException(`Incorrect OTP, Provided OTP is incorrect ${otp}`);
    }
  }
}
