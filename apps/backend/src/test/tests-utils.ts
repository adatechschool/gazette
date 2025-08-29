import { Collection } from '@mikro-orm/core'
import { User } from '@/entities/user.entity'

export function createMockUser(overrides: Partial<User> = {}): User {
  const user = new User()
  user.id = '1'
  user.pseudo = 'Marie'
  user.email = 'marie@marie.com'
  user.password = 'hashedPassword'
  user.createdAt = new Date()
  user.lastConnection = new Date()
  user.subscriptions = new Collection(user, [])

  return Object.assign(user, overrides)
}

// src/test-utils/factories.ts
import { faker } from '@faker-js/faker';
import { Media } from '@/entities/media.entity';

export const createTestMedia = (): Media => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentences(2),
  picture: faker.image.url(),
  urlRss: faker.internet.url() + '/feed.xml',
  createdAt: new Date(),
  subscribers: undefined,
});