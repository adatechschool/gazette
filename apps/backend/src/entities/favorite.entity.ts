import { PrimaryKeyUuid } from "src/utils/PrimaryKeyUuid.decorator";
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from "./user.entity";
import { Media } from "./media.entity";

@Entity()
export class Favorite {
    @PrimaryKeyUuid()
    id!: string;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Media)
    mediaType!: Media;

    @Property()
    createdAt = new Date()
}