import { Entity, Property } from '@mikro-orm/core';
import { PrimaryKeyUuid } from 'src/utils/PrimaryKeyUuid.decorator';

@Entity()
export class User {
  @PrimaryKeyUuid()
  id: string;

  @Property()
  pseudo!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  lastConnection = new Date();

  // @OneToMany(() => Media, media => media.id)
  // mediaId!: number[]
}
