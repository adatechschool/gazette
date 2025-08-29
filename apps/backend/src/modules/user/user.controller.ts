import { SubscriptionDto } from '@gazette/shared'
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { SubscriptionsService } from '../subscription/subscription.service'
import { UsersService } from './user.service'

/**
 * Interface locale pour typer correctement l'objet `req` (Request)
 * afin d'inclure les informations utilisateur injectées par ton système d'auth.
 */

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
  }
}

/**
 * UsersController
 *
 * Ce controller gère les **routes HTTP liées aux utilisateurs**.
 *
 * Dans NestJS, un **Controller** :
 * - Définit les points d'entrée (endpoints) pour répondre aux requêtes HTTP.
 * - Appelle la logique métier (dans le Service correspondant).
 *
 * Ici, `UsersController` expose des routes sous le préfixe `/users`.
 */

@Controller('users')
export class UsersController {
  /**
   * On injecte ici deux services :
   * - `UsersService` : contient la logique métier pour gérer les utilisateurs.
   * - `SubscriptionsService` : permet de récupérer les abonnements d’un utilisateur.
   */
  constructor(private usersService: UsersService, private subscriptionsService: SubscriptionsService) { }

  /**
   * @POST /users
   * Crée un nouvel utilisateur avec les données envoyées dans le corps de la requête.
   *
   * @param body - Les données de l'utilisateur (pseudo, email, password).
   * @returns L'utilisateur créé.
   */

  @Post()
  async create(
    @Body() body: { pseudo: string, email: string, password: string },
  ) {
    const user = body
    const newUser = await this.usersService.create(user)
    return newUser
  }

  /**
   * @GET /users
   * Récupère tous les utilisateurs.
   *
   * Protégé par le `AuthGuard` → nécessite que l'utilisateur soit authentifié.
   *
   * @returns La liste des utilisateurs.
   */
  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    const users = await this.usersService.getAll()
    return users
  }

  /**
   * @GET /users/by-email?email=...
   * Récupère un utilisateur via son adresse email.
   *
   * Protégé par le `AuthGuard`.
   *
   * @param email - L'adresse email à rechercher.
   * @returns L'utilisateur correspondant.
   */

  @Get('by-email')
  @UseGuards(AuthGuard)
  async findOne(@Query('email') email: string) {
    const user = await this.usersService.findOne(email)
    return user
  }

  /**
   * @DELETE /users/me
   * Supprime le compte de l'utilisateur actuellement connecté.
   *
   *  Protégé par le `AuthGuard`.
   *
   * @param req - La requête avec l'utilisateur injecté (id, email, pseudo).
   * @returns Message de confirmation.
   */

  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteCurrentUser(@Req() req: RequestWithUser) {
    await this.usersService.delete(req.user.id)
    return { message: 'User deleted successfully' }
  }

  /**
   * @DELETE /users/:id
   * Supprime un utilisateur par son ID.
   *
   *  Protégé par le `AuthGuard`.
   *
   * @param id - Identifiant de l'utilisateur à supprimer.
   * @returns Message de confirmation.
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id)
    return { message: 'User deleted successfully' }
  }

  /**
   * @GET /users/:userId/subscriptions
   * Récupère la liste des abonnements pour un utilisateur donné.
   *
   *  Protégé par le `AuthGuard`.
   *  Vérifie que l'utilisateur connecté ne demande **que ses propres abonnements**.
   *
   * @param userId - Identifiant de l'utilisateur.
   * @param req - La requête avec l'utilisateur connecté.
   * @returns La liste des abonnements au format `SubscriptionDto[]`.
   *
   * @throws NotFoundException si l'accès est interdit ou si aucun abonnement n'existe.
   */
  @Get(':userId/subscriptions')
  @UseGuards(AuthGuard)
  async getUserSubscriptions(@Param('userId') userId: string, @Req() req: RequestWithUser): Promise<SubscriptionDto[]> {
    // Vérifier que l'utilisateur demande ses propres abonnements
    if (req.user.id !== userId) {
      throw new NotFoundException('Access denied')
    }
    const subscriptions = await this.subscriptionsService.findByUserId(userId)
    if (!subscriptions) {
      throw new NotFoundException('Subscriptions not found for user')
    }
    // On mappe l'objet Subscription → SubscriptionDto (données exposées)
    return subscriptions.map(subscription => ({
      id: subscription.id,
      userId: subscription.user.id,
      mediaId: subscription.media.id,
      createdAt: subscription.createdAt.toISOString(),
    }))
  }
}
