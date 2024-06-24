import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities';
import { PaginationResultDto } from '../../common/dto';

export class AllUsersDto {
  @ApiProperty({ type: [User] })
  users: User[];

  @ApiProperty({ type: PaginationResultDto })
  paginationMeta: PaginationResultDto;
}
