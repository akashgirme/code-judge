import { Exclude } from 'class-transformer';
import { Problem } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class GetProblemResponseDto extends Problem {
  @Exclude()
  internalNotes: string;

  @Exclude()
  deletedAt: Date;

  @ApiProperty()
  description: string;
}
