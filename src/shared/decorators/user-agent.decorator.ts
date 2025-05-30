// src/common/decorators/user-agent.decorator.ts
import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

export const UserAgent = createParamDecorator(
   (_: unknown, ctx: ExecutionContext): string => {
      const request = ctx.switchToHttp().getRequest<Request>()
      return request.headers['user-agent'] ?? 'Неизвестно'
   }
)
