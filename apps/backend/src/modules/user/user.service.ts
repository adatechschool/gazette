import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async create(pseudo: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.pseudo = pseudo;
    user.email = email;
    user.password = password;
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
}
