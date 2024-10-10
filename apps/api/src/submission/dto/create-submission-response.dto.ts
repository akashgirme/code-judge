import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionResponseDto {
  @ApiProperty()
  id: string;
}
