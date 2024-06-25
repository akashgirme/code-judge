import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshedSessionDto {
  @ApiProperty()
  @IsJWT()
  accessToken: string;
}
