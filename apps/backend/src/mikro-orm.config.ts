import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { join } from 'path';

config();

const ormConfig = {
  driver: PostgreSqlDriver,
  entities: [join(__dirname, 'entities', '*.entity.{ts,js}')],
  entitiesTs: [join(__dirname, 'entities', '*.entity.ts')],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Convertir en nombre
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  migrations: {
    path: join(__dirname, 'migrations'),
    pathTs: join(__dirname, '..', 'src', 'migrations'),
  },
};

export default ormConfig;
