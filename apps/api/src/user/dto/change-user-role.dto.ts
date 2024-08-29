import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums';
import { IsEnum } from 'class-validator';

export class ChangeUserRoleDto {
  @ApiProperty({ type: 'enum', enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;
}
