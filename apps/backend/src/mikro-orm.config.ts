import { join } from 'path';
import dotenv from 'dotenv';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Content } from './entities/content.entity.js';
import { Media } from './entities/media.entity.js';
import { User } from './entities/user.entity.js';

dotenv.config();

export default {
  driver: PostgreSqlDriver,
  entities: [Content, Media, User],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  migrations: {
    path: join(process.cwd(), 'src', 'migrations'),
    glob: '!(*.d).{js,ts}',
  },
  discovery: {
    warnWhenNoEntities: true,
  },
};
