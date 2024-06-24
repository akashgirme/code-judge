import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../types/user-role';
import { IsEnum } from 'class-validator';

export class ChangeUserRoleDto {
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  role: UserRole;
}
