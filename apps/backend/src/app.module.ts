import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './mikro-orm.config';
import { JwtConfigModule } from './modules/jwt/jwt.config.module';
import { LoggerModule } from 'nestjs-pino';

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
		MikroOrmModule.forRoot(ormConfig),
		UsersModule,
		AuthModule,
		JwtConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
