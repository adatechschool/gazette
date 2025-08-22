import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { SubscriptionsModule } from '../subscription/subscription.module'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

/**
 * UsersModule
 *
 * Ce module regroupe toute la logique qui concerne les "Users" (utilisateurs).
 * Dans NestJS, un **Module** sert à organiser ton code par domaine métier
 * (ici, la gestion des utilisateurs).
 *
 * - Il déclare les dépendances nécessaires (ex: entités, autres modules).
 * - Il connecte les controllers (gestion des requêtes HTTP) et services ensemble ((gestion des requêtes HTTP).
 * - Il expose éventuellement des services à d'autres modules.
 *
 * @module UsersModule
 */

@Module({
  /**
   *  imports = autres modules dont ce module a besoin
   * Ici :
   * - `MikroOrmModule.forFeature([User])` → rend l’entité User disponible dans ce module
   *   (utile pour travailler avec la base de données via MikroORM).
   * - `JwtConfigModule` → permet d'utiliser la configuration JWT (authentification).
   * - `SubscriptionsModule` → permet d'utiliser la logique liée aux abonnements.
   */
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtConfigModule,
    SubscriptionsModule,
  ],
  /**
   * controllers : liste des classes qui reçoivent et gèrent
   * les requêtes HTTP (ex : GET /users, POST /users…).
   * Ici → `UsersController`.
   */
  controllers: [UsersController],

  /**
   * providers : liste des classes qui contiennent la logique métier,
   * généralement appelées "services".
   * Ici → `UsersService` qui gère la logique des utilisateurs.
   */
  providers: [UsersService],

  /**
   * exports : permet de rendre disponibles certains providers
   * à l’extérieur de ce module.  
   * Ici → `UsersService`, pour que d’autres modules puissent l’utiliser.
   */
  exports: [UsersService],
})
export class UsersModule {}
