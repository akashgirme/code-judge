import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pageIndex: number = 0;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  pageSize: number = 10;
}

export class PaginationResultDto extends PaginationDto {
  @ApiProperty()
  @IsNumber()
  totalPages: number;

  @ApiProperty()
  @IsNumber()
  totalItems: number;

  @ApiProperty()
  @IsNumber()
  itemsOnPage: number;

  @ApiProperty()
  @IsBoolean()
  isFirstPage: boolean;

  @ApiProperty()
  @IsBoolean()
  isLastPage: boolean;
}
