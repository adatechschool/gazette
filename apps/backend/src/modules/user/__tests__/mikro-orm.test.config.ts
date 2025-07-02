import { defineConfig } from "@mikro-orm/core";
import { MikroORM, SqliteDriver } from "@mikro-orm/sqlite";

export default defineConfig({
    driver: SqliteDriver,
    dbName: ':memory:', // Base en mémoire pour les tests
    entities: ['../src/entities/**/*.entity.ts'],
    entitiesTs: ['../src/entities/**/*.entity.ts'],
    debug: false,
    allowGlobalContext: true, // Création de la bdd en automatique
    schemaGenerator: {
        disableForeignKeys: false,
        createForeignKeyConstraints: true,
    },
});