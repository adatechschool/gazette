import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MikroORM } from '@mikro-orm/postgresql';
import { User } from './modules/user.entity.js';

export const DI = {} as {
  orm: MikroORM;
  em: MikroORM['em'];
};

export default {
	driver: PostgreSqlDriver,
	dbName: process.env.DB_NAME || 'gazette_db',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '5432'),
	user: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD,
	entities: [User],
	migrations: {
		path: './src/migrations',
		disableForeignKeys: false,
	  },
	metadataProvider: TsMorphMetadataProvider,
	debug: true,
} as Parameters<typeof MikroORM.init>[0];

export async function initializeDatabase() {
  try {
    const orm = await MikroORM.init({
      entities: [User],
	  dbName: process.env.DB_NAME || 'gazette_db',
	  host: process.env.DB_HOST,
	  port: parseInt(process.env.DB_PORT || '5432'),
	  user: process.env.DB_USER || 'postgres',
	  password: process.env.DB_PASSWORD,
      debug: process.env.NODE_ENV !== 'production',
    });

    DI.orm = orm;
    DI.em = orm.em;

    return orm;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}
