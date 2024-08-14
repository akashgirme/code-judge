import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SuccessMessageDto {
  @ApiProperty()
  @IsString()
  message: string;
}
