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

  @ApiProperty({
    type: 'enum',
    enum: Languages,
  })
  @Column('enum', { enum: Languages })
  language: Languages;

  @Column('enum', {
    enum: SubmissionState,
    default: SubmissionState.PENDING,
  })
  state: SubmissionState;

  @ApiProperty()
  @Column('enum', { enum: StatusMessage, default: StatusMessage.NULL })
  statusMessage: StatusMessage;

  @ApiProperty()
  @Column('int', { nullable: true })
  totalTestCases: number;

  @ApiProperty()
  @Column('int', { nullable: true })
  testCasesPassed: number;

  @ApiProperty()
  @Column('boolean', { default: false })
  finished: boolean;

  @ApiProperty()
  @ManyToOne(() => Problem, (problem) => problem.submissions, { eager: true })
  problem: Problem;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.submissions)
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
