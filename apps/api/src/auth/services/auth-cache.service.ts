import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from '../../user/entities';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OtpDetails } from '../types';

const USER_CACHING_TTL_IN_SECONDS = 1 * 60 * 60; // One Hour
const REFRESH_TOKEN_CACHING_TTL_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days
const OTP_CACHING_TTL_IN_SECONDS = 10 * 60; // 10 Min.

@Injectable()
export class AuthCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setUserCache(user: User): Promise<void> {
    await this.cacheManager.set(`user:${user.id}`, user, {
      ttl: USER_CACHING_TTL_IN_SECONDS,
    } as any);
  }

  async fetchUserFromCache(userId: string): Promise<User> {
    return this.cacheManager.get(`user:${userId}`);
  }

  async deleteUserFromCache(userId: string): Promise<void> {
    await this.cacheManager.del(`user:${userId}`);
  }

  async storeRefreshTokenInCache(refreshToken: string, userId: string): Promise<void> {
    await this.cacheManager.set(`refresh-token:${userId}`, refreshToken, {
      ttl: REFRESH_TOKEN_CACHING_TTL_IN_SECONDS,
    } as any);
  }

  async retrieveRefreshTokenFromCache(userId: string): Promise<string> {
    return this.cacheManager.get(`refresh-token:${userId}`);
  }

  async removeRefreshTokenFromCache(userId: string): Promise<void> {
    await this.cacheManager.del(`refresh-token:${userId}`);
  }

  async storeOtpDetailsInCache(otpDetails: OtpDetails, userId: string): Promise<void> {
    await this.cacheManager.set(`user-otp:${userId}`, otpDetails, {
      ttl: OTP_CACHING_TTL_IN_SECONDS,
    } as any);
  }

  async fetchOtpDetailsFromCache(userId: string): Promise<OtpDetails> {
    return this.cacheManager.get(`user-otp:${userId}`);
  }
}
