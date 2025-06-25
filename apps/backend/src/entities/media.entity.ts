import { MediaType } from '@gazette/shared'
import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'
import { Content } from './content.entity'

@Entity()
export class Media {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  name!: string

  @Enum(() => MediaType)
  type!: MediaType

  @Property({ nullable: true })
  description!: string

  @Property({ nullable: true })
  picture!: Blob

  @Property()
  urlRss!: string

  @Property()
  createdAt = new Date()

  @OneToMany({ entity: () => Content, mappedBy: 'media' })
  contents = new Collection<Content>(this)
}
