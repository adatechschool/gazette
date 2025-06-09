import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  console.log(`🚀 NOUVELLE VERSION DU CODE CHARGÉE - ${new Date().toISOString()}`)
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: false, // Désactiver CORS par défaut pour le contrôler manuellement
  })

  // Middleware CORS AVANT tous les autres middlewares
  app.use((req, res, next) => {
    const origin = req.headers.origin

    console.log('🔍 CORS Debug:', { origin, method: req.method }) // Debug

    // Vérifier si l'origine est autorisée
    if (origin === 'http://localhost:3002' || origin === 'http://127.0.0.1:3002' || origin === undefined) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*')
      console.log('✅ CORS Origin autorisé:', origin || 'same-origin')
    }
    else {
      console.log('❌ CORS Origin refusé:', origin)
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Origin')
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie')

    // Traitement spécial pour OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
      res.status(200).end()
    }

    next()
  })
  app.useLogger(app.get(Logger))
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
