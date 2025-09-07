import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { Request, Response } from 'express'
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

  // Configuration Swagger
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

  // Endpoint de health check simple
  const expressApp = app.getHttpAdapter().getInstance()
  expressApp.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT ?? 3000,
    })
  })

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')

  const logger = app.get(Logger)
  logger.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`)
  logger.log(`📚 Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api-docs`)
  logger.log(`💓 Health check: http://localhost:${process.env.PORT ?? 3000}/health`)
}

bootstrap()
