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

  async setUser(user: User): Promise<void> {
    await this.cacheManager.set(`user:${user.id}`, user, {
      ttl: SEVEN_DAYS_IN_SECONDS,
    } as any);
  }

  async getUser(userId: string): Promise<User> {
    return this.cacheManager.get(`user:${userId}`);
  }

  async removeUser(user: User): Promise<void> {
    await this.cacheManager.del(`user:${user.id}`);
  }

  async setRefreshToken(refreshToken: string, user: User): Promise<void> {
    await this.cacheManager.set(`refresh-token:${user.id}`, refreshToken, {
      ttl: SEVEN_DAYS_IN_SECONDS,
    } as any);
  }

  async clearRefreshToken(user: User): Promise<void> {
    await this.cacheManager.del(`refresh-token:${user.id}`);
  }

  //TODO: Though ttl is over but still value in not expiring in cache
  // Persisted with No Limit
  async setOtp(otpDetails: OtpDetails, user: User): Promise<void> {
    await this.cacheManager.set(`user-otp:${user.id}`, otpDetails, {
      ttl: TEN_MINUTES_IN_SECONDS,
    } as any);
  }

  async getOtp(user: User): Promise<OtpDetails> {
    return this.cacheManager.get(`user-otp:${user.id}`);
  }
}
