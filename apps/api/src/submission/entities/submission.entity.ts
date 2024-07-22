import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SupportedLanguages } from '../../problem/types';
import { Problem } from '../../problem/entities';
import { User } from '../../user/entities';
import { SubmissionStatus } from '../types';

//TODO: Add Memeory and Execution_time to Submission Entity
@Entity()
export class Submission {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('varchar')
  slug: string;

  @ApiProperty()
  @Column('enum', { enum: SupportedLanguages })
  language: SupportedLanguages;

  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
  })
  status: SubmissionStatus;

  @ApiProperty()
  @Column('int', { nullable: true })
  testCasesPassed: number;

  @ApiProperty()
  @Column('int', { nullable: true })
  totalTestCases: number;

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
