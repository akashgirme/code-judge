import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';

export class ProblemDto extends Problem {
  @ApiProperty()
  description: string;
}
