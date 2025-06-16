import { Controller } from '@nestjs/common'
import { FavoritesService } from './favorite.service'

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}
}
