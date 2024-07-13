import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { PaginationResultDto } from '../../common/dto';

export class AllProblemsResponseDto {
  @ApiProperty({ type: [Problem] })
  problems: Problem[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
