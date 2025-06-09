import { Migration } from '@mikro-orm/migrations'

export class Migration20250516094504 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "role" text check ("role" in ('user', 'admin', 'moderator')) not null default 'user';`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "role";`)
  }
}
