import type { MikroORM } from '@mikro-orm/core'
import type { EntityManager } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
}
