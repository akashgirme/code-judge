import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SortOrder } from '../types';

export class SortingDto {
  @ApiProperty({
    enum: SortOrder,
    enumName: 'SortOrder',
    example: 'ASC or DESC',
    required: false,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}
