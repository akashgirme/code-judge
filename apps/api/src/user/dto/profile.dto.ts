import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ProfileDto {
  @ApiProperty()
  user: User;
}
