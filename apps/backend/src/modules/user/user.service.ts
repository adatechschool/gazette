import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async create(): Promise<User> {
    const user = new User();
    user.pseudo = 'Micheline';
    user.email = 'mimi@adatech.com';
    user.password = 'password';
    // Sauvegarde de l'utilisateur dans la base de données
    await this.em.persistAndFlush(user);
    // Retourner l'utilisateur créé
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
