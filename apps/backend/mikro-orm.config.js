import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

export default {
  driver: PostgreSqlDriver,
  entities: ['./src/entities/*.ts'],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  migrations: {
    path: join(__dirname, 'src', 'migrations'),
    glob: '!(*.d).{js,ts}',
  },
};
