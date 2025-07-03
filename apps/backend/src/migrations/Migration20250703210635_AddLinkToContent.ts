import { Migration } from '@mikro-orm/migrations';

export class Migration20250703210635_AddLinkToContent extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "content" add column "link" varchar(255) null;`);
  }

}
