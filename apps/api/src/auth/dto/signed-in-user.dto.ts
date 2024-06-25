import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';
import { User } from '../../user/entities';

export class SignedInUserDto {
  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  user: User;
}
