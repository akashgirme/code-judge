import { ApiProperty } from '@nestjs/swagger';

export class UsernameAvailabilityDto {
  @ApiProperty({ type: Boolean })
  available: boolean;
}
