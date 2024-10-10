import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RequestSignInWithOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
