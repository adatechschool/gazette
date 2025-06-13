import type { FavoritesService } from './favorite.service'
import { Controller } from '@nestjs/common'

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}
}
