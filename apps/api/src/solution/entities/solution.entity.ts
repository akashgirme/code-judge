import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Problem } from '../../problem/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Languages } from '@code-judge/common';
import { User } from '../../user/entities';
import { Exclude } from 'class-transformer';

@Entity()
export class Solution {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column('varchar')
  @Exclude({ toPlainOnly: true })
  path: string;

  @ApiProperty({
    type: 'enum',
    enum: Languages,
  })
  @Column('enum', { enum: Languages })
  language: Languages;

  @ManyToOne(() => User, (user) => user.solutions)
  user: User;

  @ManyToOne(() => Problem, (problem) => problem.solutions)
  problem: Problem;

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
