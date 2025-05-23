import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options<PostgreSqlDriver> = {
  // on utilise PostgreSQL comme base de données relationnelle
  driver: PostgreSqlDriver,
  dbName:  process.env.DB_NAME,
  user: process.env.DB_user,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  // découverte basée sur les fichiers, avec le suffixe .entity.ts
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  // on utilise le provider ts-morph comme alternative à reflect-metadata
  metadataProvider: TsMorphMetadataProvider,
  // active le mode debug pour afficher les requêtes SQL et les infos de découverte
  debug: true,
};
export default config;