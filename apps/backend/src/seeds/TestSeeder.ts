import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { User } from '@/entities/user.entity'

export class TestSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      pseudo: 'pseudo',
      email: 'test@example.com',
      password: 'hashed_password',
    })
  }
}
