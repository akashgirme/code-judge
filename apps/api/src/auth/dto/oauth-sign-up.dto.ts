import { IsEmail, IsString } from 'class-validator';

export class OAuthSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
