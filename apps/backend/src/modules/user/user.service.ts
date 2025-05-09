import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcryptjs';

//encapsuler les opérations des users

//crypté le password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

//comparer le password avec le password saisi dans le input
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
    await this.em.persistAndFlush(user); //sauvergarder le new user dans la bdd
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

  async findOne(pseudo: string): Promise<User> {
    const user = await this.em.findOneOrFail(User, { pseudo });
    console.log(user);
    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this.em.findOneOrFail(User, { id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.em.removeAndFlush(user);
  }
}
