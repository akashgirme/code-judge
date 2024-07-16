import { ApiProperty } from '@nestjs/swagger';
import { Submission } from '../entities';

export class GetSubmissionDto extends Submission {
  @ApiProperty()
  code: string;
}
