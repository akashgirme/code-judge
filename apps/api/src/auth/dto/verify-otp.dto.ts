import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => (value as string).trim())
  email: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  otp: string;
}
