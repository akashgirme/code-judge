import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProblemDifficulty, ProblemStatus } from '../types';
import { User } from '../../user/entities';
import { Topic } from './topic.entity';

@Entity()
export class Problem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ProblemDifficulty,
  })
  difficulty: ProblemDifficulty;

  @ApiProperty()
  @Column('varchar')
  slug: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.problems)
  author: User;

  @ApiProperty({ type: [Topic] })
  @ManyToMany(() => Topic, (topic) => topic.problems)
  @JoinTable()
  topics: Topic[];

  @ApiProperty()
  @Column('text', { nullable: true })
  internalNotes: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ProblemStatus,
    default: ProblemStatus.UNPUBLISHED,
  })
  status: ProblemStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
