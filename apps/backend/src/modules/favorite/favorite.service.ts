import type { EntityManager } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FavoritesService {
  constructor(private readonly em: EntityManager) {}
}
