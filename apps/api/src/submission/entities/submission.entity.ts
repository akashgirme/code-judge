import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Problem } from '../../problem/entities';
import { User } from '../../user/entities';
import { Languages, SubmissionStatus } from '@code-judge/common';
import { Exclude } from 'class-transformer';

@Entity()
export class Submission {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  @Exclude({ toPlainOnly: true })
  sourceCodePath: string;

  @Column('varchar', { nullable: true })
  @Exclude({ toPlainOnly: true })
  stderrPath: string;

  @ApiProperty({
    enum: Languages,
    enumName: 'Languages',
  })
  @Column('enum', { enum: Languages })
  language: Languages;

  @ApiProperty({
    enum: SubmissionStatus,
    enumName: 'SubmissionStatus',
  })
  @Column('enum', { enum: SubmissionStatus })
  status: SubmissionStatus;

  @ApiProperty()
  @Column('int', { nullable: true })
  totalTestCases: number;

  @ApiProperty()
  @Column('int', { nullable: true })
  testCasesPassed: number;

  @ApiProperty()
  @Column('float8', { nullable: true })
  time: number;

  @ApiProperty()
  @Column('int', { nullable: true })
  memory: number;

  @ManyToOne(() => Problem, (problem) => problem.submissions, { eager: true })
  @Exclude({ toPlainOnly: true })
  problem: Problem;

  @ManyToOne(() => User, (user) => user.submissions)
  @Exclude({ toPlainOnly: true })
  user: User;

  @ApiProperty({ type: Date })
  @Column('date')
  createdAt: Date;
}
