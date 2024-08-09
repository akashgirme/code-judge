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

    console.log('otp\n', otp);
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
      throw new ForbiddenException('Otp expired! Please resend otp');
    }

    if (otpDetails.otpAttempts > 5) {
      throw new ForbiddenException(
        'Cannot validate otp',
        'Too Many Attempts, Please send new otp to continue.'
      );
    }

    const match = await bcrypt.compare(otp, otpDetails.otp);

    otpDetails.otpAttempts++;
    await this.cacheService.storeOtpDetailsInCache(otpDetails, user.id);

    if (!match) {
      throw new ForbiddenException('Incorrect otp', `Provided otp is incorrect ${otp}`);
    }
  }
}
