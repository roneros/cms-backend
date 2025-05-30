import { type INestApplication, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggerModule } from 'nestjs-pino'

import { isDev } from './core/config/env.config'
import { PrismaModule } from './core/prisma/prisma.module'
import { RedisModule } from './core/redis/redis.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { ProductsModule } from './modules/products/products.module'
import { SessionModule } from './modules/session/session.module'
import { StorageModule } from './modules/storage/storage.module'
import { SuppliersModule } from './modules/suppliers/suppliers.module'
import { UserModule } from './modules/user/user.module'
import { BlockedUserGuard, JwtAuthGuard, JwtStrategy } from './shared/guards'

const path = '/docs'

@Module({
   providers: [
      JwtStrategy,
      {
         provide: APP_GUARD,
         useClass: JwtAuthGuard
      },
      { provide: APP_GUARD, useClass: BlockedUserGuard } // проверка isBlocked
   ],
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         expandVariables: true,
         ignoreEnvFile: !isDev,
         envFilePath: ['.env.development', '.env']
      }),
      LoggerModule.forRoot({
         renameContext: 'name',
         pinoHttp: {
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            transport:
               process.env.NODE_ENV === 'production'
                  ? undefined
                  : {
                       target: 'pino-pretty',
                       options: {
                          colorize: true,
                          singleLine: true,
                          translateTime: true
                          //   ignore: 'pid,hostname,req'
                       }
                    }
         }
      }),
      RedisModule,
      PrismaModule,
      SessionModule,
      AuthModule,
      ProductsModule,
      CategoriesModule,
      SuppliersModule,
      StorageModule,
      UserModule
   ]
})
export class AppModule {
   static createSwagger(app: INestApplication) {
      const docApi = SwaggerModule.createDocument(
         app,
         new DocumentBuilder()
            .setTitle('BerryKids - API')
            .setDescription('Документация API BerryKids')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
            .build(),
         { include: [AppModule], deepScanRoutes: true }
      )
      SwaggerModule.setup(path, app, docApi, {})
   }
}
