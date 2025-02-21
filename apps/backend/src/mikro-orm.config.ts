import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
	// for simplicity, we use the PostGresql database, as it's available pretty much everywhere
	driver: PostgreSqlDriver,

	dbName: process.env.DB_NAME || 'gazette_db',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '5432'),
	user: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD?.toString(),

	// folder-based discovery setup, using common filename suffix
	entities: ['dist/**/*.entity.js'],
	entitiesTs: ['src/**/*.entity.ts'],
	// we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
	// check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
	metadataProvider: TsMorphMetadataProvider,
	// enable debug mode to log SQL queries and discovery information
	debug: true,
};

export default config;
