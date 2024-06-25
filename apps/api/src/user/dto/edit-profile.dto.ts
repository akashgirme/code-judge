import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class EditProfileDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  firstName: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => (value as string).trim())
  lastName: string;
}
