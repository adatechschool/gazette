import { Migration } from '@mikro-orm/migrations';

export class Migration20250627132104_InitialSchema extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "media" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "type" text check ("type" in ('article', 'video', 'podcast')) not null, "description" varchar(255) null, "picture" bytea null, "created_at" timestamptz not null, constraint "media_pkey" primary key ("id"));`);

    this.addSql(`create table "content" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "date" timestamptz not null, "description" varchar(255) null, "type" text check ("type" in ('article', 'video', 'podcast')) not null, "media_id_id" uuid not null, "created_at" timestamptz not null, constraint "content_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "pseudo" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "last_connection" timestamptz not null, "role" text check ("role" in ('admin', 'user', 'moderator')) not null default 'user', constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "favorite" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "media_type_id" uuid not null, "created_at" timestamptz not null, constraint "favorite_pkey" primary key ("id"));`);

    this.addSql(`alter table "content" add constraint "content_media_id_id_foreign" foreign key ("media_id_id") references "media" ("id") on update cascade;`);

    this.addSql(`alter table "favorite" add constraint "favorite_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "favorite" add constraint "favorite_media_type_id_foreign" foreign key ("media_type_id") references "media" ("id") on update cascade;`);
  }

}
