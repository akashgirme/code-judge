import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class VerifyTokenDto {
  @ApiProperty()
  @IsJWT()
  verificationToken: string;
}
