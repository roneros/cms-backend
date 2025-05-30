// src/modules/session/session.service.ts
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RefreshToken } from '@prisma/client'
import argon2 from 'argon2'
import DeviceDetector from 'device-detector-js'
import { v4 as uuidv4 } from 'uuid'

import { TConfigService } from '@/core/config/env.config'
import { PrismaService } from '@/core/prisma/prisma.service'
import { ms } from '@/shared/utils'

export interface RefreshTokenMeta {
   ip?: string
   userAgent?: string
   device?: string
}

@Injectable()
export class SessionService {
   private readonly detector = new DeviceDetector()
   private readonly logger = new Logger(SessionService.name)
   readonly refreshTokenTtlMs = 7 * 24 * 60 * 60 * 1000

   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService<TConfigService>
   ) {}

   async createSession(
      userId: string,
      meta: RefreshTokenMeta
   ): Promise<{ rawToken: string; session: RefreshToken }> {
      const ttl: number =
         ms(this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN')) ?? this.refreshTokenTtlMs
      try {
         if (!meta.device && meta.userAgent) {
            const parsed = this.detector.parse(meta.userAgent)
            const deviceType = parsed.device?.type || 'unknown'
            const osName = parsed.os?.name || 'unknown'
            const capitalizedType = deviceType.charAt(0).toUpperCase() + deviceType.slice(1)
            meta.device = `${capitalizedType} / ${osName}`
         }

         const rawToken = uuidv4()
         const expiresAt = new Date(Date.now() + ttl)
         const hashedToken = await argon2.hash(rawToken)

         const session = await this.prisma.refreshToken.create({
            data: {
               id: uuidv4(),
               userId,
               hashedToken,
               expiresAt,
               ip: meta.ip,
               userAgent: meta.userAgent,
               device: meta.device
            }
         })

         this.logger.log(`Created session ${session.id}`)
         return { rawToken, session }
      } catch (err: unknown) {
         const e = err instanceof Error ? err : new Error('Unknown')
         this.logger.error(`createSession ERR: ${e.message}`, e.stack)
         throw new InternalServerErrorException('Could not create session')
      }
   }

   async getSessions(userId: string): Promise<RefreshToken[]> {
      try {
         return this.prisma.refreshToken.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
         })
      } catch (err: unknown) {
         const e = err instanceof Error ? err : new Error('Unknown')
         this.logger.error(`getSessions ERR: ${e.message}`, e.stack)
         throw new InternalServerErrorException('Could not fetch sessions')
      }
   }

   async removeSession(id: string, userId: string): Promise<void> {
      let s: RefreshToken | null
      try {
         s = await this.prisma.refreshToken.findUnique({ where: { id } })
      } catch (err: unknown) {
         const e = err instanceof Error ? err : new Error('Unknown')
         this.logger.error(`findUnique ERR: ${e.message}`, e.stack)
         throw new InternalServerErrorException('Could not revoke session')
      }
      if (!s || s.userId !== userId) {
         this.logger.warn(`Session ${id} not found or wrong owner`)
         throw new NotFoundException('Session not found')
      }
      try {
         await this.prisma.refreshToken.delete({ where: { id } })
         this.logger.log(`Revoked session ${id}`)
      } catch (err: unknown) {
         const e = err instanceof Error ? err : new Error('Unknown')
         this.logger.error(`delete ERR: ${e.message}`, e.stack)
         throw new InternalServerErrorException('Could not revoke session')
      }
   }

   async validateSession(rawToken: string): Promise<RefreshToken> {
      try {
         const list = await this.prisma.refreshToken.findMany()
         for (const s of list) {
            if (await argon2.verify(s.hashedToken, rawToken)) {
               if (s.expiresAt < new Date()) {
                  this.logger.warn(`Session ${s.id} expired`)
                  throw new NotFoundException('Session expired')
               }
               return s
            }
         }
         this.logger.warn('Validation failed for token')
         throw new NotFoundException('Session not found')
      } catch (err: unknown) {
         if (err instanceof NotFoundException) throw err
         const e = err instanceof Error ? err : new Error('Unknown')
         this.logger.error(`validateSession ERR: ${e.message}`, e.stack)
         throw new InternalServerErrorException('Could not validate session')
      }
   }

   async removeByRawToken(rawToken: string): Promise<void> {
      try {
         const session = await this.validateSession(rawToken)
         await this.prisma.refreshToken.delete({ where: { id: session.id } })
         this.logger.log(`Revoked session ${session.id} by raw token`)
      } catch (err: unknown) {
         const e = err instanceof Error ? err : new Error('Unknown')
         this.logger.warn(`removeByRawToken failed: ${e.message}`)
      }
   }
}
