import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class TestCaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  input: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  output: string;
}

export class CreateTestCasesDto {
  @ApiProperty({ type: [TestCaseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  testCases: TestCaseDto[];
}
