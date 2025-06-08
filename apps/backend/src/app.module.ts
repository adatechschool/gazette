import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtConfigModule } from './modules/jwt/jwt.config.module';
import { LoggerModule } from 'nestjs-pino';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				transport: {
					target: 'pino-pretty',
					options: {
						singleLine: true,
						colorize: true,
					},
				},
			},
		}),
		MikroOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				driver: PostgreSqlDriver,
				host: configService.get<string>('DB_HOST'),
				port: parseInt(configService.get<string>('DB_PORT', '5432')),
				user: configService.get<string>('DB_USER'),
				password: configService.get<string>('DB_PASSWORD'),
				dbName: configService.get<string>('DB_NAME'),
				debug: configService.get<string>('NODE_ENV') === 'development',
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
			}),
		}),
		UsersModule,
		AuthModule,
		JwtConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }