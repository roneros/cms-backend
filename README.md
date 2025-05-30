# src

├── core/                   # Инициализация приложения (main.ts, app.module.ts)
│   ├── config/             # ConfigModule и schema через zod
│   ├── redis/              # RedisModule (подключение, провайдеры)
│   ├── prisma/             # PrismaModule, PrismaService, middleware
│   └── logger/             # PinoLoggerModule
│
├── common/                 # Переиспользуемые модули, которые важны и для frontend, и admin
│   ├── mail/               # Email уведомления
│   ├── sms/                # SMS сервис
│   ├── totp/               # TOTP генерация/валидация
│   ├── store/              # Возможный shared state (если понадобится)
│   └── auth/               # Общий AuthModule (JWT, session, etc)
│
├── shared/                 # Guards, interceptors, pipes, decorators и т.д.
│   ├── guards/
│   ├── interceptors/
│   ├── decorators/
│   └── utils/
│
├── modules/                # Пока только CMS/Админка
│   ├── auth/               # Только login + подтверждение (TOTP/email/sms)
│   ├── account/            # Сотрудники, блокировка, удаление и т.д.
│   ├── product/            # Продукты (внутренняя информация)
│   └── ...

<!-- import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/core/prisma/prisma.service'

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) {}

   private readonly cache: CacheService // обертка над Redis
   async findByEmail(email: string): Promise<User | null> {
      const cacheKey = `user:email:${email}`
      const cached = await this.cache.get<User>(cacheKey)
      if (cached) return cached
      const user = await this.prisma.user.findUnique({ where: { email } })
      if (user) {
         await this.cache.set(cacheKey, user, { ttl: 60 * 5 }) // 5 минут
      }
      return user
   }
} -->
