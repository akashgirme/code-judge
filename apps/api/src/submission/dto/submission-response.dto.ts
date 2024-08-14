import { ApiProperty } from '@nestjs/swagger';
import { Submission } from '../entities';
import { Exclude } from 'class-transformer';

export class SubmissionDto extends Submission {
  @Exclude()
  path: string;

  @ApiProperty()
  code: string;
}
