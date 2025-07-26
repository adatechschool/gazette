import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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
  const config = new DocumentBuilder()
    .setTitle('Gazette API')
    .setDescription('API pour l\'application Gazette')
    .setVersion('1.0')
    .addTag('gazette')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  app.useLogger(app.get(Logger))
  app.use(cookieParser())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
