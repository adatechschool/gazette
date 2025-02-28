import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '../../../../../packages/types/user.type';
import { User, User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(newUser: User) {
    const item = new User(): User;
    item.username = newUser.pseudo;
    item.email = newUser.email;
    item.password = newUser.password; // Assurez-vous que le mot de passe est crypté avant de le sauvegarder

    // Sauvegarde de l'utilisateur dans la base de données
    await this.em.persistAndFlush(item);

    // Retourner l'utilisateur créé
    return item;
  }

  findAll(): User[] {
    return this.users;
  }
}
