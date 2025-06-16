import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { UsersModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Module({
  imports: [
    UsersModule,
    JwtConfigModule,
    MikroOrmModule.forFeature([User]),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
