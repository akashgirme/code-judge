import { ApiProperty } from '@nestjs/swagger';
import { Solution } from '../entities';

export class SolutionDto extends Solution {
  @ApiProperty()
  description: string;
}
