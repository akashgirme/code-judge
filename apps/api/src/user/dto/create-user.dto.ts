import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { AuthProvider } from '../../auth/enums';

export class CreateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(AuthProvider)
  provider: AuthProvider;

  @IsBoolean()
  hasOnborded?: boolean;
}
