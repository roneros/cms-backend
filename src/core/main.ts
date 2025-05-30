import 'reflect-metadata'

import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { Logger } from 'nestjs-pino'

import { ms, parseBoolean, type StringValue } from '@/shared/utils'

import { AppModule } from '../app.module'

import { isDev, type TConfigService } from './config/env.config'
import { RedisService } from './redis/redis.service'

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: isDev
   })
   app.useLogger(app.get(Logger))
   app.set('trust proxy', true)

   const configService = app.get(ConfigService<TConfigService>)
   const redis = app.get(RedisService)

   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true, // удаляет лишние поля
         transform: true, // превращает query/body → нужные типы
         stopAtFirstError: true,
         enableDebugMessages: true,
         forbidNonWhitelisted: true, // бросает ошибку на чужие поля
         forbidUnknownValues: true,
         transformOptions: {
            enableImplicitConversion: true, // Number, Boolean автоматически
            excludeExtraneousValues: true // Убираем всё, что не описано в DTO @ApiProperty() или @Expose()
         }
      })
   )
   app.enableCors({
      origin: configService.getOrThrow<string>('ALLOWED_ORIGINS').split(','),
      credentials: true,
      exposedHeaders: ['set-cookie'],
      allowedHeaders: [
         'Authorization',
         'X-API-KEY',
         'Content-Type: application/json'
      ],
      maxAge: 3600
   })
   app.use(cookieParser(configService.getOrThrow<string>('COOKIES_SECRET')))
   app.use(
      session({
         secret: configService.getOrThrow<string>('SESSION_SECRET'),
         name: configService.getOrThrow<string>('SESSION_NAME'),
         resave: true,
         saveUninitialized: false,
         cookie: {
            domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
            maxAge: ms(
               configService.getOrThrow<StringValue>('SESSION_MAX_AGE')
            ),
            httpOnly: parseBoolean(
               configService.getOrThrow<string>('SESSION_HTTP_ONLY')
            ),
            secure: parseBoolean(
               configService.getOrThrow<string>('SESSION_SECURE')
            ),
            sameSite: 'lax'
         },
         store: new RedisStore({
            client: redis,
            prefix: configService.getOrThrow<string>('SESSION_PREFIX') // Папка сессий
         })
      })
   )
   if (isDev) {
      AppModule.createSwagger(app)
      // AdminModule.createSwagger(app)
   }
   const logger = app.get(Logger)

   await app.listen(configService.getOrThrow<number>('SERVER_PORT', 3333))
   if (isDev)
      logger.log(
         'The server launched on the port: ' +
            configService.getOrThrow<number>('SERVER_PORT', 7777)
      )
}
void bootstrap()
