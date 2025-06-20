import { MediaType } from '@gazette/shared'
import { Entity, Enum, Property } from '@mikro-orm/core'
import { PrimaryKey } from '@mikro-orm/core'

@Entity()
export class Media {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
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
  urlRss: string

  @Property()
  createdAt = new Date()
}
