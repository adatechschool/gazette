import { Migration } from '@mikro-orm/migrations'

export class Migration20250704071618_RemoveMediaTypeColumn extends Migration {
  override async up(): Promise<void> {
    // Supprimer la contrainte de vérification pour la colonne type
    this.addSql(`ALTER TABLE "media" DROP CONSTRAINT IF EXISTS "media_type_check";`)

    // Supprimer la colonne type de la table media
    this.addSql(`ALTER TABLE "media" DROP COLUMN IF EXISTS "type";`)
  }

  override async down(): Promise<void> {
    // Remettre la colonne type avec sa contrainte de vérification
    this.addSql(`ALTER TABLE "media" ADD COLUMN "type" text check ("type" in ('article', 'video', 'podcast')) not null;`)
  }
}
