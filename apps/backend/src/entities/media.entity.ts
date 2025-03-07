import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Media {
  @PrimaryKey()
  id!: number;

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
