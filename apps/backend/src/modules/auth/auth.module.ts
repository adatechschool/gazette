import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { UsersModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

/**
 * Module d'authentification de l'application Gazette
 * 
 * Ce module gère toutes les fonctionnalités liées à l'authentification des utilisateurs :
 * - Connexion et déconnexion
 * - Validation des tokens JWT
 * - Protection des routes avec des guards
 * - Gestion des sessions utilisateur
 * 
 * @module AuthModule
 * @version 1.0.0
 * @author Équipe Gazette
 * 
 * @example
 * ```typescript
 * // Utilisation dans app.module.ts
 * import { AuthModule } from './modules/auth/auth.module';
 * 
 * @Module({
 *   imports: [AuthModule],
 * })
 * export class AppModule {}
 * ```
 * 
 * @see {@link AuthService} Pour les services d'authentification
 * @see {@link AuthController} Pour les endpoints d'authentification
 * @see {@link AuthGuard} Pour la protection des routes
 */

@Module({
  imports: [
     /** Module de gestion des utilisateurs */
    UsersModule,
    /** Configuration JWT pour les tokens */
    JwtConfigModule,
    /** Configuration JWT pour les tokens */
    MikroOrmModule.forFeature([User]),
  ],
  providers: [
    /** Configuration JWT pour les tokens */
    AuthService, 
    /** Configuration JWT pour les tokens */
    AuthGuard],
  controllers: [
    /** Contrôleur pour les endpoints d'authentification */
    AuthController],
  exports: [
    /** Services exportés pour utilisation dans d'autres modules */
    AuthService, AuthGuard],
})
export class AuthModule {}
