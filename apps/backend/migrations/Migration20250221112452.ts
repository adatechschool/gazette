import { Migration } from '@mikro-orm/migrations';

export class Migration20250221112452 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "media" ("id" serial primary key, "name" varchar(255) not null, "type" text check ("type" in ('article', 'video', 'podcast')) not null, "description" varchar(255) null, "picture" bytea null, "created_at" timestamptz not null);`);

    this.addSql(`create table "content" ("id" serial primary key, "title" varchar(255) not null, "date" timestamptz not null, "description" varchar(255) null, "type" text check ("type" in ('article', 'video', 'podcast')) not null, "media_id_id" int not null, "created_at" timestamptz not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "pseudo" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "last_connection" timestamptz not null);`);

    this.addSql(`alter table "content" add constraint "content_media_id_id_foreign" foreign key ("media_id_id") references "media" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "content" drop constraint "content_media_id_id_foreign";`);

    this.addSql(`drop table if exists "media" cascade;`);

    this.addSql(`drop table if exists "content" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);
  }

}
