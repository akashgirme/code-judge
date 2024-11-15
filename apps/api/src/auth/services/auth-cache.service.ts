import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OtpDetails } from '../types';

const REFRESH_TOKEN_CACHING_TTL_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days
const OTP_CACHING_TTL_IN_SECONDS = 10 * 60; // 10 Min.

@Injectable()
export class AuthCacheService {
  private logger = new Logger(AuthCacheService.name);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async storeRefreshTokenInCache(refreshToken: string, userId: number): Promise<void> {
    try {
      await this.cacheManager.set(`refresh-token:${userId}`, refreshToken, {
        ttl: REFRESH_TOKEN_CACHING_TTL_IN_SECONDS,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    } catch (error) {
      this.logger.error(`Failed to store refreshToken in cache ${error}`);
      throw new Error(error);
    }
  }

  async retrieveRefreshTokenFromCache(userId: number): Promise<string> {
    return this.cacheManager.get(`refresh-token:${userId}`);
  }

  removeRefreshTokenFromCache(userId: number): Promise<void> {
    return this.cacheManager.del(`refresh-token:${userId}`);
  }

  async storeOtpDetailsInCache(otpDetails: OtpDetails, userId: number): Promise<void> {
    try {
      await this.cacheManager.set(`user-otp:${userId}`, otpDetails, {
        ttl: OTP_CACHING_TTL_IN_SECONDS,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    } catch (error) {
      this.logger.error(`Failed to store otpDetails ${error}`);
    }
  }

  fetchOtpDetailsFromCache(userId: number): Promise<OtpDetails> {
    return this.cacheManager.get(`user-otp:${userId}`);
  }

  deleteOptDetailsFromCache(userId: number) {
    return this.cacheManager.del(`user-otp:${userId}`);
  }
}
