import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddTestCasesDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  problemId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  input: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  output: string;
}
