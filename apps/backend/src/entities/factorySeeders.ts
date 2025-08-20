import { faker } from '@faker-js/faker'
import { Factory } from '@mikro-orm/seeder'
import { User } from './user.entity'

export class UserFactory extends Factory<User> {
  model = User

  definition(): Partial<User> {
    return {
      pseudo: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    }
  }
}
