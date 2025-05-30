// src/shared/guards/blocked-user.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/core/prisma/prisma.service'

@Injectable()
export class BlockedUserGuard implements CanActivate {
   constructor(private readonly prisma: PrismaService) {}

   async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const req = ctx.switchToHttp().getRequest()
      const userId = req.user?.userId as string | undefined
      if (!userId) return true // не нашлось — пусть дальше идет JwtAuthGuard

      const user = await this.prisma.user.findUnique({
         where: { id: userId },
         select: { isBlocked: true }
      })

      if (user?.isBlocked) {
         throw new ForbiddenException('Account is blocked')
      }
      return true
   }
}

/*
@Module({
  providers: [
    { provide: APP_GUARD, useClass: BlockedUserGuard },    // проверка isBlocked
  ],
  // …
})
export class AppModule {}
*/
