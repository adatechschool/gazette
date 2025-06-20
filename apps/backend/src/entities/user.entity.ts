import { UserRole } from '@gazette/shared'
import { Entity, Enum, Property } from '@mikro-orm/core'
import { PrimaryKey } from '@mikro-orm/core'

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string

  @Property()
  pseudo!: string

  @Property()
  email!: string

  @Property()
  password!: string

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  lastConnection = new Date()

  @Enum(() => UserRole)
  role: UserRole = UserRole.USER // Valeur user par défault

  // @OneToMany(() => Media, media => media.id)
  // mediaId!: number[]
}
