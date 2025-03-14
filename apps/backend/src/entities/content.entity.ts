import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Media } from './media.entity';

@Entity()
export class Content {
  @PrimaryKey()
  id!: number;

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

export enum ContentType {
  Article = 'article',
  Video = 'video',
  Podcast = 'podcast',
}
