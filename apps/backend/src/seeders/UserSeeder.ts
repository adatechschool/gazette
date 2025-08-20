import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { UserFactory } from '@/entities/factorySeeders'

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new UserFactory(em).make(10)
  }
}
