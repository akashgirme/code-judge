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

  @ApiProperty({
    enum: ProblemStatus,
    enumName: 'ProblemStatus',
  })
  @Column({
    type: 'enum',
    enum: ProblemStatus,
    default: ProblemStatus.UNPUBLISHED,
  })
  status: ProblemStatus;

  @ApiProperty()
  @Column({
    default: false,
  })
  hasPlatformTestCases: boolean;

  @ApiProperty({ type: [Tag] })
  @ManyToMany(() => Tag, (tag) => tag.problems)
  @JoinTable()
  tags: Tag[];

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.problems)
  author: User;

  @OneToMany(() => Submission, (submission) => submission.problem)
  submissions: Submission[];

  @OneToMany(() => Solution, (solution) => solution.problem)
  solutions: Solution[];

  @ApiProperty()
  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;
}
