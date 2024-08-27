import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from '../../problem/entities';
import { User } from '../../user/entities';
import { SubmissionState } from '../enums';
import { Languages, StatusMessage } from '@code-judge/common';
import { Exclude } from 'class-transformer';

@Entity()
export class Submission {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiHideProperty()
  @Column('varchar')
  @Exclude({ toPlainOnly: true })
  path: string;

  @ApiHideProperty()
  @Column('varchar', { nullable: true })
  @Exclude({ toPlainOnly: true })
  stderrPath: string;

  @ApiProperty({
    type: 'enum',
    enum: Languages,
  })
  @Column('enum', { enum: Languages })
  language: Languages;

  @ApiProperty({
    type: 'enum',
    enum: SubmissionState,
  })
  @Column('enum', {
    enum: SubmissionState,
    default: SubmissionState.PENDING,
  })
  state: SubmissionState;

  @ApiProperty({
    type: 'enum',
    enum: StatusMessage,
  })
  @ApiProperty()
  @Column('enum', { enum: StatusMessage, default: StatusMessage.NULL })
  statusMessage: StatusMessage;

  @ApiProperty({ type: Number })
  @Column('int', { nullable: true })
  totalTestCases: number;

  @ApiProperty({ type: Number })
  @Column('int', { nullable: true })
  testCasesPassed: number;

  @ApiProperty({ type: Number })
  @Column('float8', { nullable: true })
  time: number;

  @ApiProperty({ type: Number })
  @Column('int', { nullable: true })
  memory: number;

  @ApiProperty({ type: Boolean })
  @Column('boolean', { default: false })
  finished: boolean;

  @ApiProperty({ type: () => Problem })
  @ManyToOne(() => Problem, (problem) => problem.submissions, { eager: true })
  problem: Problem;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.submissions)
  user: User;

  @ApiProperty({ type: Date })
  @CreateDateColumn()
  createdAt: Date;
}
