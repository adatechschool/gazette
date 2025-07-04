import { Migration } from '@mikro-orm/migrations'

export class Migration20250704_RemoveContentTypeColumn extends Migration {
  override async up(): Promise<void> {
    // Supprimer la colonne type de content
    this.addSql(`ALTER TABLE "content" DROP COLUMN IF EXISTS "type";`)
  }

  override async down(): Promise<void> {
    // Remettre la colonne type de content
    this.addSql(`ALTER TABLE "content" ADD COLUMN "type" text check ("type" in ('article', 'video', 'podcast')) not null;`)
  }
}
