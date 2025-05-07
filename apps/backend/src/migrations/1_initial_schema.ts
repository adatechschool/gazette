import { Migration } from '@mikro-orm/migrations';

export class Migration20240101000000 extends Migration {
  async up(): Promise<void> {
    // Les entités seront automatiquement créées par MikroORM
    // Cette migration est vide car nous utilisons autoLoadEntities: true
  }

  async down(): Promise<void> {
    // Cette migration est vide car nous utilisons autoLoadEntities: true
  }
}
