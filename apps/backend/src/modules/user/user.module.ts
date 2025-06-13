import { Module } from '@nestjs/common'
import { JwtConfigModule } from '../jwt/jwt.config.module'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

@Module({
  imports: [JwtConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
