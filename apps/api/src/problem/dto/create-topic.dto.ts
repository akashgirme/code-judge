import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Only alphabetical characters and white spaces are allowed.',
  })
  @Transform(({ value }) => (value as string).trim().toLowerCase())
  topicName: string;
}
