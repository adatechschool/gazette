import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: false // Désactiver CORS par défaut pour le contrôler manuellement
  });

  // Middleware CORS AVANT tous les autres middlewares
  app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Toujours définir les headers CORS
    if (origin === 'http://localhost:3001') {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Origin');
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

    // Traitement spécial pour OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    next();
  });
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
