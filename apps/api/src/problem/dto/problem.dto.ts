import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { Exclude } from 'class-transformer';

export class ProblemDto extends Problem {
  @Exclude()
  remark: string;

  @ApiProperty()
  description: string;
}
