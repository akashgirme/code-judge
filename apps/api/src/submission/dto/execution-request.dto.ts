import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SupportedLanguages } from '../../problem/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ExecutionRequestDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  problemId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  @ApiProperty({ enum: SupportedLanguages, enumName: 'Languages' })
  @IsEnum(SupportedLanguages)
  @IsNotEmpty()
  language: SupportedLanguages;
}
