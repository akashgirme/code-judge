import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword, IsJWT } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsJWT()
  verificationToken: string;
}
