import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Media } from './media.entity';
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator';
import { ContentType } from '@gazette/shared';


@Entity()
export class Content {
  @PrimaryKeyUuid()
  id!: string;

  @Property()
  title!: string;

  @Property()
  date = new Date();

  @Property({ nullable: true })
  description!: string;

  @Enum(() => ContentType)
  type!: ContentType;

  @ManyToOne(() => Media)
  mediaId!: Media;

  @Property()
  createdAt = new Date();
}
