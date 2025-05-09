import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

export default config;

if (require.main === module) {
  const command = process.argv[2];
  const name = process.argv[3]?.split('=')[1];

  MikroORM.init(config).then(async (orm) => {
    try {
      const migrator = orm.getMigrator();

      switch (command) {
        case 'migration:create':
          console.log('Creating migration...');
          const migration = await migrator.createMigration();
          console.log('Migration created:', migration);
          break;

        case 'migration:up':
          console.log('Running migrations...');
          await migrator.up();
          console.log('Migrations completed successfully');
          break;

        case 'migration:down':
          console.log('Rolling back migrations...');
          await migrator.down();
          console.log('Migrations rolled back successfully');
          break;

        default:
          console.error('Unknown command:', command);
          process.exit(1);
      }

      await orm.close(true);
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  }).catch(error => {
    console.error('Failed to initialize MikroORM:', error);
    process.exit(1);
  });
}
