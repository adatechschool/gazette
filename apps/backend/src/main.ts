import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3002'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, Origin',
      exposedHeaders: 'Set-Cookie',
    },
  })

  app.useLogger(app.get(Logger))
  app.use(cookieParser())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
