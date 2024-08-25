import { ApiProperty } from '@nestjs/swagger';
import { Submission } from '../entities';
import { Exclude } from 'class-transformer';

export class SubmissionDto extends Submission {
  @Exclude()
  path: string;

  @Exclude()
  stderrPath: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  stderr: string;
}
