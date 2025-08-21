import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Subscription } from './subscription.entity'
import { Like } from './like.entity'

@Entity()
export class User {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  pseudo!: string

  @Property()
  email!: string

  @Property({ hidden: true })
  password!: string

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  lastConnection = new Date()

  @OneToMany(() => Subscription, subscription => subscription.user, {
    orphanRemoval: true,
    cascade: [Cascade.REMOVE]
  })
  subscriptions = new Collection<Subscription>(this)

  @OneToMany(() => Like , like => like.user, {
    orphanRemoval: true,
    cascade: [Cascade.REMOVE]
  })
  likes = new Collection<Like>(this)
}
