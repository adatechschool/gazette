import type { Options } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { ConfigService } from '@nestjs/config'
// import dotenv from 'dotenv';

// dotenv.config();

function config(configService: ConfigService): Options<PostgreSqlDriver> {
  return {
    driver: PostgreSqlDriver,
    host: configService.get('DB_HOST'),
    port: Number.parseInt(configService.get('DB_PORT') || '5432'),
    user: configService.get('DB_USER') || 'postgres',
    password: configService.get('DB_PASSWORD'),
    dbName: configService.get('DB_NAME') || 'gazette_db',
    debug: configService.get('NODE_ENV') === 'development',
    metadataProvider: TsMorphMetadataProvider,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    migrations: {
      path: './dist/migrations',
      pathTs: './src/migrations',
      tableName: 'mikro_orm_migrations',
      transactional: true,
      allOrNothing: true,
      dropTables: false,
      safe: true,
      emit: 'ts',
    },
  }
}

export default config
