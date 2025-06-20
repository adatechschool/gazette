import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from 'src/utils/PrimaryKeyUuid.decorator'
import { Media } from './media.entity'
import { User } from './user.entity'

@Entity()
export class Favorite {
  @PrimaryKey({type:'uuid', defaultRaw:'gen_random_uuid()'})
  id!: string

  @ManyToOne(() => User)
  user!: User

  @ManyToOne(() => Media)
  mediaType!: Media

  @Property()
  createdAt = new Date()
}
