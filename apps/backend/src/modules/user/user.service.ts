import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

export type NewUser = any;

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async create(userData: {
    pseudo: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await hashPassword(userData.password);
    const user = new User();
    user.pseudo = userData.pseudo;
    user.email = userData.email;
    user.password = hashedPassword;
    await this.em.persistAndFlush(user);
    return user;
  }
  async getAll(): Promise<User[]> {
    const users = await this.em.findAll(User);
    return users.map((user) => ({
      pseudo: user.pseudo,
      email: user.email,
      password: user.password,
      id: user.id,
      createdAt: user.createdAt,
      lastConnection: user.lastConnection,
    }));
  }

  async findOne(pseudo: string): Promise<User | undefined> {
    const user = await this.em.findOne(User, { pseudo });
    return user ?? undefined;
  }
}
