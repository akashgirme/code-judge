import { IsEnum } from 'class-validator';
import { AuthProvider } from '../types';

export class AuthProviderDto {
  @IsEnum(AuthProvider)
  provider: AuthProvider;
}
