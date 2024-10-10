import { ApiProperty } from '@nestjs/swagger';
import { Solution } from '../entities';
import { PaginationResultDto } from '../../common/dto';

export class AllSolutionsDto {
  @ApiProperty({ type: () => [Solution] })
  solutions: Solution[];

  @ApiProperty({ type: () => PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
