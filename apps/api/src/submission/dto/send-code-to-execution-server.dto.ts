import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SupportedLanguages } from '../../problem/enums';

export class SendCodeToExecutionServerDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  submissionId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  problemId: string;

  @IsString()
  @IsNotEmpty()
  sourceCodeSlug: string;

  @IsEnum(SupportedLanguages)
  @IsNotEmpty()
  language: SupportedLanguages;
}
