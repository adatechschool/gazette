import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';

config();

const ormConfig = {
  driver: PostgreSqlDriver,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Convertir en nombre
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
};

export default ormConfig;
