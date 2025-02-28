import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
	@PrimaryKey()
	id!: number;

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