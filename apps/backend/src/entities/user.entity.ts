import { Entity, Enum, Property } from '@mikro-orm/core';
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator';
import { UserRole } from '@gazette/shared';

@Entity()
export class User {
  @PrimaryKeyUuid()
  id!: string;

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

 @Enum(() => UserRole)
  role: UserRole = UserRole.USER; // Valeur user par défault


  // @OneToMany(() => Media, media => media.id)
  // mediaId!: number[]
}