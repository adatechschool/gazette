import { Entity, Enum, Property } from '@mikro-orm/core';
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator';

@Entity()
export class Media {
  @PrimaryKeyUuid()
  id!: string;

  @Property()
  name!: string;

  @Enum(() => MediaType)
  type!: MediaType;

  @Property({ nullable: true })
  description!: string;

  @Property({ nullable: true })
  picture!: Blob;

  @Property()
  createdAt = new Date();
}

export enum MediaType {
  Article = 'article',
  Video = 'video',
  Podcast = 'podcast',
}
