import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
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
import { Submission } from '../../submission/entities';
import { Exclude } from 'class-transformer';
import { Tag } from './tag.entity';
import { Solution } from '../../solution/entities';
import { TestCase } from './test-case.entity';

@Entity()
export class Problem {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({
    enum: ProblemDifficulty,
    enumName: 'ProblemDifficulty',
  })
  @Column('enum', {
    enum: ProblemDifficulty,
  })
  difficulty: ProblemDifficulty;

  @ApiHideProperty()
  @Column('varchar')
  @Exclude({ toPlainOnly: true })
  slug: string;

  @ApiHideProperty()
  @Column('varchar')
  @Exclude({ toPlainOnly: true })
  descriptionPath: string;

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
  })
  @Column('enum', {
    enum: ProblemStatus,
    default: ProblemStatus.UNPUBLISHED,
  })
  status: ProblemStatus;

  @ApiProperty()
  @Column('text', { nullable: true, default: '' })
  internalNotes: string;

  @ApiProperty({ type: [Tag] })
  @ManyToMany(() => Tag, (tag) => tag.problems)
  @JoinTable()
  tags: Tag[];

  @ApiProperty({
    type: User,
  })
  @ManyToOne(() => User, (user) => user.problems)
  author: User;

  @OneToMany(() => TestCase, (testCase) => testCase.problem)
  testCase: TestCase[];

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];

  @OneToMany(() => Solution, (solution) => solution.problem)
  solutions: Solution[];

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
