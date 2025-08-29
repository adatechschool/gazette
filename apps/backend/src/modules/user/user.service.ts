import { EntityManager } from '@mikro-orm/core'
import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@/entities/user.entity'
import { hashPassword, verifyPassword } from './user.utils'

/**
 * UsersService
 *
 * Ce service contient **la logique métier** liée aux utilisateurs.
 *
 * Dans NestJS, un **Service** :
 * - Est injectable dans d’autres classes (grâce à `@Injectable`).
 * - Contient les règles métier, interactions avec la base de données, etc.
 *
 * Ici, `UsersService` gère :
 * - La création d’un utilisateur (avec hash du mot de passe).
 * - La récupération de tous les utilisateurs.
 * - La recherche d’un utilisateur par email.
 * - La suppression d’un utilisateur par son ID.
 */

@Injectable()
export class UsersService {
  /**
   * On injecte `EntityManager` de MikroORM :
   * - C’est l’objet principal qui permet d’interagir avec la base.
   * - Il gère la création, recherche, modification et suppression des entités.
   */
  constructor(private readonly em: EntityManager) {}

  /**
   * Crée un nouvel utilisateur.
   *
   * Étapes :
   * 1. Hash le mot de passe avec `hashPassword`.
   * 2. Crée une instance de l’entité `User`.
   * 3. Remplit les champs (pseudo, email, password hashé).
   * 4. Persiste et sauvegarde en base via `persistAndFlush`.
   *
   * @param userData - Les données de l’utilisateur (pseudo, email, password).
   * @returns L’utilisateur créé (entité `User`).
   */

  async create(userData: {
    pseudo: string
    email: string
    password: string
  }): Promise<User> {
    const hashedPassword = await hashPassword(userData.password)
    const user = new User()
    user.pseudo = userData.pseudo
    user.email = userData.email
    user.password = hashedPassword
    // Enregistre immédiatement l’utilisateur en DB
    await this.em.persistAndFlush(user)
    return user
  }
  /**
   * Récupère tous les utilisateurs.
   *
   * Étapes :
   * 1. Utilise `EntityManager.findAll(User)` pour charger tous les utilisateurs.
   * 2. Transforme la liste pour retourner uniquement certains champs.
   *
   *
   * @returns La liste des utilisateurs.
   */

  async getAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.em.findAll(User)
    return users.map(user => ({
      pseudo: user.pseudo,
      email: user.email,
      id: user.id,
      createdAt: user.createdAt,
      lastConnection: user.lastConnection,
      subscriptions: user.subscriptions,
    }))
  }

  /**
   * Récupère un utilisateur à partir de son email.
   *
   * Utilise `findOneOrFail` :
   * - Retourne l’utilisateur s’il existe.
   * - Lance une erreur automatiquement s’il n’existe pas.
   *
   * @param email - L’adresse email à rechercher.
   * @returns L’entité `User` correspondante.
   */

  async findOne(email: string): Promise<Omit<User, 'password'>> {
    const user = await this.em.findOneOrFail(User, { email })
    return {
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      createdAt: user.createdAt,
      lastConnection: user.lastConnection,
      subscriptions: user.subscriptions,
    }
  }

  /**
   * Supprime un utilisateur par son ID.
   *
   * Étapes :
   * 1. Cherche l’utilisateur via `findOneOrFail`.
   * 2. S’il n’existe pas, on lance une `NotFoundException`.
   * 3. Sinon, on le supprime avec `removeAndFlush`.
   *
   * @param id - L’ID de l’utilisateur à supprimer.
   * @throws NotFoundException si l’utilisateur n’existe pas.
   */

  async delete(id: string): Promise<void> {
    const user = await this.em.findOneOrFail(User, { id })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    await this.em.removeAndFlush(user)
  }

  /**
   * Récupère un utilisateur avec son mot de passe (hashé).
   *
   * ⚠️ À utiliser uniquement pour l’authentification (login).
   * Ne jamais exposer directement cet objet dans une réponse API.
   *
   * @param email - L'adresse email de l'utilisateur.
   * @returns L'utilisateur complet, y compris `password`.
   */
  async findOneWithPassword(email: string): Promise<User> {
    const user = await this.em.findOneOrFail(User, { email })
    return user
  }
}

/**
 * Ré-exporte deux fonctions utilitaires pour gérer les mots de passe :
 * - `hashPassword` : pour hasher un mot de passe avant stockage.
 * - `verifyPassword` : pour comparer un mot de passe en clair avec un hash.
 */
export { hashPassword, verifyPassword }
