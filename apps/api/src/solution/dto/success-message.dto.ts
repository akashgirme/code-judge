import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessageDto {
  @ApiProperty()
  message: string;
}
