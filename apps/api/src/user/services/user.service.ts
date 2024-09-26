import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { getPaginationMeta } from '../../common/utility';
import { PaginationDto } from '../../common/dto';
import { ChangeUserRoleDto, CreateUserDto, EditProfileDto, OnboardUserDto } from '../dto';
import { MailService } from '../../mail/mail.service';
import { welcomeMjml } from '../../mail/mjml';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private mailService: MailService,
    private configService: ConfigService
  ) {}

  findAccountByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
    });
  }

  findAccountById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  findVerifiedAccountByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email, isEmailVerified: true },
    });
  }

  findVerifiedAccountById(id: number): Promise<User | null> {
    return this.repo.findOne({ where: { id, isEmailVerified: true } });
  }

  findUserByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username, isEmailVerified: true } });
  }

  async create({
    firstName,
    lastName,
    email,
    password,
    provider,
    hasOnborded,
  }: CreateUserDto) {
    const createdUser = this.repo.create({
      firstName,
      lastName,
      email,
      password,
      provider,
      hasOnboarded: hasOnborded,
    });
    return await this.repo.save(createdUser);
  }

  findAccountByEmailAndId(id: number, email: string): Promise<User | null> {
    return this.repo.findOne({ where: { id, email } });
  }

  async setVerifyTrue(id: number) {
    const user = await this.findAccountById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    try {
      user.isEmailVerified = true;

      await this.repo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updatePassword(id: number, hashedPassword: string) {
    const user = await this.findVerifiedAccountById(id);

    try {
      user.password = hashedPassword;

      await this.repo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async onboard(user: User, { firstName, lastName }: OnboardUserDto) {
    const currentUser = await this.findAccountById(user.id);

    if (!currentUser) {
      throw new NotFoundException(`User not found with id: '${user.id}'`);
    }

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.hasOnboarded = true;

    const updatedUser = await this.repo.save(currentUser);

    this.mailService.sendMail({
      to: updatedUser.email,
      subject: 'Welcome to Code-Judge',
      htmlBody: welcomeMjml,
      data: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    });

    return updatedUser;
  }

  async editProfile(user: User, { firstName, lastName }: EditProfileDto) {
    user.firstName = firstName;
    user.lastName = lastName;

    const updatedUser = await this.repo.save(user);
    return { user: updatedUser };
  }

  async changeUserRole(userId: number, { role }: ChangeUserRoleDto) {
    const user = await this.findAccountById(userId);
    if (!user) throw new NotFoundException(`User not found with id: ${userId}`);

    if (user.email === `${this.configService.get<string>('PRIMARY_ADMIN_EMAIL')}`) {
      throw new BadRequestException('Cannot change the role of primary admin');
    }

    user.role = role;
    return await this.repo.save(user);
  }

  async getAllUsers({ pageIndex = 0, pageSize = 10 }: PaginationDto) {
    const [users, totalItems] = await this.repo
      .createQueryBuilder('user')
      .where('user.hasOnboarded = :hasOnboarded', {
        hasOnboarded: true,
      })
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.role',
        'user.createdAt',
        'user.updatedAt',
      ])
      .orderBy('user.updatedAt', 'DESC')
      .skip(pageIndex * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: users.length }
    );

    return { users, paginationMeta };
  }
}
