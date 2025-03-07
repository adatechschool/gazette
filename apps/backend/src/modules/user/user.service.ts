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
  // findAll(): User[] {
  //   return this.users;
  // }
}
