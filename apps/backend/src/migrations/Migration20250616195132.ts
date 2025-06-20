import { Migration } from '@mikro-orm/migrations';

export class Migration20250616195132 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "favorite" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "media_type_id" uuid not null, "created_at" timestamptz not null, constraint "favorite_pkey" primary key ("id"));`);

    this.addSql(`alter table "favorite" add constraint "favorite_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "favorite" add constraint "favorite_media_type_id_foreign" foreign key ("media_type_id") references "media" ("id") on update cascade;`);

    this.addSql(`alter table "media" add column "url_rss" varchar(255) not null;`);
  }

}
