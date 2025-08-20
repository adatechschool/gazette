import { Seeder } from '@mikro-orm/seeder'
import { MediaSeeder } from './MediaSeeder'
import { UserSeeder } from './UserSeeder'

export class DatabaseSeeder extends Seeder {
  async run(em) {
    return this.call(em, [UserSeeder, MediaSeeder])
  }
}
