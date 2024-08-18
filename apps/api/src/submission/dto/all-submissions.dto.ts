import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { PaginationResultDto } from '../../common/dto';
import { Submission } from '../entities';
import { Exclude } from 'class-transformer';

export class SubmissionResponse extends Submission {
  @ApiHideProperty()
  @Exclude()
  path: string;
}

export class AllSubmissionsDto {
  @ApiProperty({ type: [SubmissionResponse] })
  submissions: SubmissionResponse[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
