import { ApiProperty } from '@nestjs/swagger';
import { Submission } from '../entities';

export class SubmissionResponseDto extends Submission {
  @ApiProperty()
  code: string;
}
