import { Migration } from '@mikro-orm/migrations';

export class Migration20250314112341 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "content" drop constraint "content_media_id_id_foreign";`,
    );

    this.addSql(`alter table "media" alter column "id" drop default;`);
    this.addSql(
      `alter table "media" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "media" alter column "id" set default gen_random_uuid();`,
    );

    this.addSql(`alter table "content" alter column "id" drop default;`);
    this.addSql(
      `alter table "content" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "content" alter column "id" set default gen_random_uuid();`,
    );
    this.addSql(
      `alter table "content" alter column "media_id_id" drop default;`,
    );
    this.addSql(
      `alter table "content" alter column "media_id_id" type uuid using ("media_id_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "content" add constraint "content_media_id_id_foreign" foreign key ("media_id_id") references "media" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "media" alter column "id" type text using ("id"::text);`,
    );

    this.addSql(
      `alter table "content" alter column "id" type text using ("id"::text);`,
    );
    this.addSql(
      `alter table "content" alter column "media_id_id" type text using ("media_id_id"::text);`,
    );

    this.addSql(
      `alter table "content" drop constraint "content_media_id_id_foreign";`,
    );

    this.addSql(`alter table "media" alter column "id" drop default;`);
    this.addSql(
      `alter table "media" alter column "id" type int using ("id"::int);`,
    );
    this.addSql(`create sequence if not exists "media_id_seq";`);
    this.addSql(
      `select setval('media_id_seq', (select max("id") from "media"));`,
    );
    this.addSql(
      `alter table "media" alter column "id" set default nextval('media_id_seq');`,
    );

    this.addSql(`alter table "content" alter column "id" drop default;`);
    this.addSql(
      `alter table "content" alter column "id" type int using ("id"::int);`,
    );
    this.addSql(
      `alter table "content" alter column "media_id_id" type int using ("media_id_id"::int);`,
    );
    this.addSql(`create sequence if not exists "content_id_seq";`);
    this.addSql(
      `select setval('content_id_seq', (select max("id") from "content"));`,
    );
    this.addSql(
      `alter table "content" alter column "id" set default nextval('content_id_seq');`,
    );
    this.addSql(
      `alter table "content" add constraint "content_media_id_id_foreign" foreign key ("media_id_id") references "media" ("id") on update cascade;`,
    );
  }
}
