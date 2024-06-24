import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class SignInUserDto {
  @ApiProperty()
  @IsEmail()
  @Transform(({ value }) => (value as string).trim())
  email: string;
}
