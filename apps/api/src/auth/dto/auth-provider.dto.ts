import { IsEnum } from 'class-validator';
import { AuthProvider } from '../enums';

export class AuthProviderDto {
  @IsEnum(AuthProvider)
  provider: AuthProvider;
}
