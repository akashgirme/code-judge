import { ApiProperty } from '@nestjs/swagger';

export class VerificationEmailSentDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;
}
