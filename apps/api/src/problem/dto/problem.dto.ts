import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class ProblemDto extends Problem {
  @ApiProperty()
  description: string;
}
