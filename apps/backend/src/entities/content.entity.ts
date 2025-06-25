import { ContentType } from '@gazette/shared'
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Media } from './media.entity'

@Entity()
export class Content {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  title!: string

  @Property()
  date = new Date()

  @Property({ nullable: true })
  description!: string

  @Enum(() => ContentType)
  type!: ContentType

  @ManyToOne(() => Media)
  media!: Media

  @Property()
  createdAt = new Date()
}
