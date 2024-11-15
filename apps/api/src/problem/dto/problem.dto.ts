import { ApiProperty } from '@nestjs/swagger';
import { Problem } from '../entities';
import { TestCase } from '../entities/test-case.entity';
import { Exclude } from 'class-transformer';

export class ProblemDto extends Problem {
  @Exclude()
  internalNotes: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [TestCase] })
  exampleTestCases: TestCase[];

  @Exclude()
  actualTestCases: TestCase[];
}
