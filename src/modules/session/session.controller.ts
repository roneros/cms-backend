// src/modules/session/session.controller.ts
import {
   BadRequestException,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpStatus,
   Logger,
   Param,
   Req,
   UseGuards
} from '@nestjs/common'
import { RefreshToken } from '@prisma/client'
import type { Request } from 'express'

import { JwtAuthGuard } from '@/shared/guards'

import { SessionService } from './session.service'

@Controller('auth/sessions')
@UseGuards(JwtAuthGuard)
export class SessionController {
   private readonly logger = new Logger(SessionController.name)

   constructor(private readonly sessionService: SessionService) {}

   @Get()
   async getSessions(
      @Req() req: RequestWithUser
   ): Promise<GetSessionsResponse> {
      const userId = req.user.userId
      this.logger.log(`Fetch sessions for ${userId}`)

      const rawToken = req.cookies['refreshToken'] as string
      if (!rawToken) throw new BadRequestException('No refresh token')

      const current = await this.sessionService.validateSession(rawToken)
      const all = await this.sessionService.getSessions(userId)

      const toDto = (s: RefreshToken): SessionInfo => ({
         id: s.id,
         createdAt: s.createdAt,
         expiresAt: s.expiresAt,
         ip: s.ip ?? undefined,
         userAgent: s.userAgent ?? undefined,
         device: s.device ?? undefined
      })

      return {
         currentSession: toDto(current),
         otherSessions: all.filter(x => x.id !== current.id).map(toDto)
      }
   }

   @Delete(':id')
   @HttpCode(HttpStatus.OK)
   async removeSession(
      @Param('id') id: string,
      @Req() req: RequestWithUser
   ): Promise<{ success: boolean }> {
      const uid = req.user.userId
      this.logger.log(`Remove session ${id} for ${uid}`)

      const raw = req.cookies['refreshToken'] as string
      if (!raw) throw new BadRequestException('No refresh token')

      const current = await this.sessionService.validateSession(raw)
      if (current.id === id) {
         throw new BadRequestException('Cannot remove current session')
      }

      await this.sessionService.removeSession(id, uid)
      return { success: true }
   }
}

interface RequestWithUser extends Request {
   user: { userId: string }
}

interface SessionInfo {
   id: string
   createdAt: Date
   expiresAt: Date
   ip?: string
   userAgent?: string
   device?: string
}

interface GetSessionsResponse {
   currentSession: SessionInfo
   otherSessions: SessionInfo[]
}
