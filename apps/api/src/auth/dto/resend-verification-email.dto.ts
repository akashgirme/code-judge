import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsUUID } from 'class-validator';

export class ResendVerificationEmailDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsEmail()
  email: string;
}
