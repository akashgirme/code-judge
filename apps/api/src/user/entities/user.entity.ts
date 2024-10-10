import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums';
import { AuthProvider } from '../../auth/enums';
import { Problem } from '../../problem/entities';
import { Exclude } from 'class-transformer';
import { Submission } from '../../submission/entities';
import { Solution } from '../../solution/entities';

@Entity()
export class User {
  @ApiProperty({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ type: String })
  @Column('varchar')
  username: string;

  @ApiProperty({ type: String })
  @Column('varchar', { nullable: true })
  firstName?: string;

  @ApiProperty({ type: String })
  @Column('varchar', { nullable: true })
  lastName?: string;

  @ApiProperty({ type: String })
  @Column('varchar')
  email: string;

  @ApiProperty({ type: Boolean })
  @Column('boolean', { default: false })
  isEmailVerified: boolean;

  @Column('varchar')
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ type: Boolean })
  @Column('boolean', { default: false })
  hasOnboarded: boolean;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.EMAIL,
  })
  @Exclude({ toPlainOnly: true })
  provider: AuthProvider;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Problem, (problem) => problem.author)
  problems: Problem[];

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions: Submission[];

  @OneToMany(() => Solution, (solution) => solution.user)
  solutions: Solution[];

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
