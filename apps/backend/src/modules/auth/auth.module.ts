import { Module } from '@nestjs/common'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { UsersModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [UsersModule, JwtConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
