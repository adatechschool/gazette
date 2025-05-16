import { Entity, Enum, Property } from '@mikro-orm/core';
import { PrimaryKeyUuid } from '../utils/PrimaryKeyUuid.decorator';
import { Role } from 'src/modules/roles/role.enum';

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

 @Enum(() => Role)
  role: Role = Role.User; // Valeur user par défault


  // @OneToMany(() => Media, media => media.id)
  // mediaId!: number[]
}
