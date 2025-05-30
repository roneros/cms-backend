import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

import { TConfigService } from '@/core/config/env.config'

@Injectable()
export class RedisService extends Redis {
   constructor(private readonly configService: ConfigService<TConfigService>) {
      super(configService.getOrThrow<string>('REDIS_URL'))
   }
}
