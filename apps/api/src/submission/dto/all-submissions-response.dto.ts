import { ApiProperty } from '@nestjs/swagger';
import { Submission } from '../entities';
import { PaginationResultDto } from '../../common/dto';

export class AllSubmissionsDto {
  @ApiProperty({ type: [Submission] })
  submissions: Submission[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
