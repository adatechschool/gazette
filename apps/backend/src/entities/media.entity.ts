import { Entity, Property } from '@mikro-orm/core'
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator'

@Entity()
export class Media {
  @PrimaryKeyUuid()
  id!: string

  @Property()
  name!: string

  @Property({ nullable: true })
  description!: string

  @Property({ nullable: true })
  picture!: string

  @Property()
  urlRss!: string

  @Property()
  createdAt = new Date()
}
