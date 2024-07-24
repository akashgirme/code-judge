import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProblemDifficulty, ProblemStatus } from '../enums';
import { User } from '../../user/entities';
import { Topic } from './topic.entity';
import { Submission } from '../../submission/entities';
import { Exclude } from 'class-transformer';

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

  @Column('text', { nullable: true })
  @Exclude({ toPlainOnly: true })
  internalNotes: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ProblemStatus,
    default: ProblemStatus.UNPUBLISHED,
  })
  status: ProblemStatus;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;
}
