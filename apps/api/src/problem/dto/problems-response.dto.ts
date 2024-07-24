import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { PaginationResultDto } from '../../common/dto';

export class ProblemsResponseDto {
  @ApiProperty({ type: [Problem] })
  problems: Problem[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
