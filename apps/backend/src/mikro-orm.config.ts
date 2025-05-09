import { join } from 'path';
import dotenv from 'dotenv';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Content } from './entities/content.entity';
import { Media } from './entities/media.entity';
import { User } from './entities/user.entity';

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
  autoLoadEntities: true,
  migrations: {
    path: join(process.cwd(), 'src', 'migrations'),
    glob: '!(*.d).{js,ts}',
    transactional: true,
    allOrNothing: true,
    emit: 'ts' as const,
  },
  discovery: {
    warnWhenNoEntities: true,
  },
};
