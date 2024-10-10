import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TestCaseType } from '../enums';
import { Problem } from './problem.entity';

@Entity()
export class TestCase {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    enum: TestCaseType,
    enumName: 'TestCaseType',
  })
  @Column({
    type: 'enum',
    enum: () => TestCaseType,
  })
  type: TestCaseType;

  @ApiProperty()
  @Column('varchar')
  input: string;

  @ApiProperty()
  @Column('varchar')
  output: string;

  @ManyToOne(() => Problem, (problem) => problem.testCase)
  problem: Problem;

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
