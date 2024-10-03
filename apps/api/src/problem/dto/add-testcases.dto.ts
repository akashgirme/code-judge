import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddTestCasesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  input: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  output: string;
}
