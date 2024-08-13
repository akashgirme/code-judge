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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstName?: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ default: false })
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
