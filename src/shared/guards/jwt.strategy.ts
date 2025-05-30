// JWT Strategy: src/common/guards/jwt.strategy.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import type { StrategyOptionsWithoutRequest } from 'passport-jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { TConfigService } from '@/core/config/env.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   constructor(private readonly config: ConfigService<TConfigService>) {
      const options: StrategyOptionsWithoutRequest = {
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET')
      }
      super(options)
   }

   validate(payload: { sub: string }) {
      return { userId: payload.sub }
   }
}
