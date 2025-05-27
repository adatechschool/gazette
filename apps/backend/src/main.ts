import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  app.enableCors({
		origin: ['http://localhost:3001'],
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
	});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
