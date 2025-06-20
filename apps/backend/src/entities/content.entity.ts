import { ContentType } from '@gazette/shared'
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { PrimaryKey } from '@mikro-orm/core';
import { Media } from './media.entity'

@Entity()
export class Content {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;
  
  @Property()
  title!: string

  @Property()
  date = new Date()

  @Property({ nullable: true })
  description!: string

  @Enum(() => ContentType)
  type!: ContentType

  @ManyToOne(() => Media)
  mediaId!: Media

  @Property()
  createdAt = new Date()
}
