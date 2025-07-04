import { Migration } from '@mikro-orm/migrations'

export class Migration20250704062329_UpdateMediaAndContentForRssFeeds extends Migration {
  override async up(): Promise<void> {
    // Supprimer la contrainte existante
    this.addSql(`ALTER TABLE "content" DROP CONSTRAINT IF EXISTS "content_media_id_id_foreign";`)

    // Ajouter url_rss à media
    this.addSql(`ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "url_rss" varchar(255) not null;`)

    // Changer le type de picture de Blob à string
    this.addSql(`ALTER TABLE "media" ALTER COLUMN "picture" TYPE varchar(255) USING ("picture"::varchar(255));`)

    // Supprimer la colonne type de content
    this.addSql(`ALTER TABLE "content" DROP COLUMN IF EXISTS "type";`)

    // Rendre media_id_id nullable
    this.addSql(`ALTER TABLE "content" ALTER COLUMN "media_id_id" DROP NOT NULL;`)

    // Recréer la contrainte
    this.addSql(`ALTER TABLE "content" ADD CONSTRAINT "content_media_id_id_foreign" FOREIGN KEY ("media_id_id") REFERENCES "media" ("id") ON UPDATE CASCADE ON DELETE SET NULL;`)
  }

  override async down(): Promise<void> {
    // Supprimer la contrainte
    this.addSql(`ALTER TABLE "content" DROP CONSTRAINT IF EXISTS "content_media_id_id_foreign";`)

    // Supprimer url_rss de media
    this.addSql(`ALTER TABLE "media" DROP COLUMN IF EXISTS "url_rss";`)

    // Remettre picture en Blob
    this.addSql(`ALTER TABLE "media" ALTER COLUMN "picture" TYPE bytea USING ("picture"::bytea);`)

    // Remettre la colonne type de content
    this.addSql(`ALTER TABLE "content" ADD COLUMN "type" text check ("type" in ('article', 'video', 'podcast')) not null;`)

    // Remettre media_id_id en not null
    this.addSql(`ALTER TABLE "content" ALTER COLUMN "media_id_id" SET NOT NULL;`)

    // Recréer la contrainte originale
    this.addSql(`ALTER TABLE "content" ADD CONSTRAINT "content_media_id_id_foreign" FOREIGN KEY ("media_id_id") REFERENCES "media" ("id") ON UPDATE CASCADE;`)
  }
}
