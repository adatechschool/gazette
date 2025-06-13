import { Migration } from '@mikro-orm/migrations'

export class Migration20250606123240 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_role_check";`)

    this.addSql(`alter table "user" add constraint "user_role_check" check("role" in ('admin', 'user', 'moderator'));`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_role_check";`)

    this.addSql(`alter table "user" add constraint "user_role_check" check("role" in ('user', 'admin', 'moderator'));`)
  }
}
