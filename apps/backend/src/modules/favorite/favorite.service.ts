import { EntityManager } from '@mikro-orm/core'
import { Inject, Injectable } from '@nestjs/common'
import { Favorite } from 'src/entities/favorite.entity'
import { Media } from 'src/entities/media.entity'
import { User } from 'src/entities/user.entity'

@Injectable()
export class FavoritesService {
  constructor(@Inject(EntityManager) private readonly em: EntityManager) {}

  async findAll(): Promise<Favorite[]> {
    return this.em.find(Favorite, {})
  }

  async create(userId: string, mediaId: string): Promise<Favorite> {
    const favorite = new Favorite()
    favorite.user = this.em.getReference(User, userId)
    favorite.mediaType = this.em.getReference(Media, mediaId)
    await this.em.persistAndFlush(favorite)
    return favorite
  }
}
