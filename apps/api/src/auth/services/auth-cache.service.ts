import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from '../../user/entities';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OtpDetails } from '../types';

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
const TEN_MINUTES_IN_SECONDS = 10 * 60;

@Injectable()
export class AuthCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setUserCache(user: User): Promise<void> {
    await this.cacheManager.set(`user:${user.id}`, user, {
      ttl: SEVEN_DAYS_IN_SECONDS,
    } as any);
  }

  async fetchUserFromCache(userId: string): Promise<User> {
    return this.cacheManager.get(`user:${userId}`);
  }

  async deleteUserFromCache(user: User): Promise<void> {
    await this.cacheManager.del(`user:${user.id}`);
  }

  async storeRefreshTokenInCache(refreshToken: string, user: User): Promise<void> {
    await this.cacheManager.set(`refresh-token:${user.id}`, refreshToken, {
      ttl: SEVEN_DAYS_IN_SECONDS,
    } as any);
  }

  async retrieveRefreshTokenFromCache(user: User): Promise<string> {
    return this.cacheManager.get(`refresh-token:${user.id}`);
  }

  async removeRefreshTokenFromCache(user: User): Promise<void> {
    await this.cacheManager.del(`refresh-token:${user.id}`);
  }

  async storeOtpDetailsInCache(otpDetails: OtpDetails, user: User): Promise<void> {
    await this.cacheManager.set(`user-otp:${user.id}`, otpDetails, {
      ttl: TEN_MINUTES_IN_SECONDS,
    } as any);
  }

  async fetchOtpDetailsFromCache(user: User): Promise<OtpDetails> {
    return this.cacheManager.get(`user-otp:${user.id}`);
  }
}
