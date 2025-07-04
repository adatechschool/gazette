import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Media } from './media.entity'
import { User } from './user.entity'

@Entity()
export class Favorite {
  @PrimaryKeyUuid()
  id!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Media)
  mediaType!: Media

  @Property()
  createdAt = new Date()
}
