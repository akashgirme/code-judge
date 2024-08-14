import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { PaginationResultDto } from '../../common/dto';

export class AllProblemsDto {
  @ApiProperty({ type: [Problem] })
  problems: Problem[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
