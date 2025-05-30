import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha/interfaces/google-recaptcha-module-options'
import type { Request } from 'express'

import { isDev, type TConfigService } from './env.config'

export const getRecaptchaConfig = (
   configService: ConfigService<TConfigService>
): GoogleRecaptchaModuleOptions => ({
   secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),

   response: (req: Request): string => {
      const recaptchaHeader = req.headers['x-recaptcha-token'] // или 'recaptcha'

      const token =
         typeof recaptchaHeader === 'string'
            ? recaptchaHeader
            : Array.isArray(recaptchaHeader)
              ? recaptchaHeader[0]
              : undefined

      if (!token) {
         console.warn('⚠️ RECAPTCHA HEADER NOT FOUND:', req.headers)
         throw new Error('Missing reCAPTCHA token in headers')
      }

      return token
   },

   skipIf: isDev
})
