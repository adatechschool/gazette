import type { AppService } from './app.service'
import { Controller } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
