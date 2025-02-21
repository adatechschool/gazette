import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables d'environnement

const config = {
  entities: ['./dist/entities'], // Chemin vers vos entités
  entitiesTs: ['./src/entities'], // Pour le développement avec TypeScript
  dbName: process.env.DB_NAME,
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Convertir en nombre
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true, // Activez le mode debug si nécessaire
  migrations: {
    path: './migrations', // Dossier des migrations
    glob: '!(*.d).{js,ts}',
  },
} as Parameters<typeof MikroORM.init>[0];

export default config;
