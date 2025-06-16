import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Favorite } from 'src/entities/favorite.entity'
import { Media } from 'src/entities/media.entity'
import { User } from 'src/entities/user.entity'
import { FavoritesController } from './favorite.controller'
import { FavoritesService } from './favorite.service'

@Module({
  imports: [
    MikroOrmModule.forFeature([Favorite, User, Media]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
