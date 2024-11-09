import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Submission } from '../entities';

export class SubmissionResponse extends Submission {
  @ApiProperty()
  sourceCode: string;

  @ApiProperty()
  error?: string;

  @Exclude()
  sourceCodePath: string;

  @Exclude()
  stderrPath: string;
}
