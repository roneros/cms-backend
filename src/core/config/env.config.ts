import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export const envSchema = z.object({
   NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

   SERVER_PORT: z.coerce.number().default(3000), // coerce превращает из string в number
   SERVER_URL: z.string().optional(),
   ALLOWED_ORIGINS: z.string().optional(),

   COOKIES_SECRET: z.string().min(5).optional(),
   COOKIES_DOMAIN: z.string().optional(),

   SESSION_SECRET: z.string().min(5).optional(),
   SESSION_NAME: z.string(),
   SESSION_DOMAIN: z.string().optional(),
   SESSION_MAX_AGE: z.coerce.number().positive().optional(),
   SESSION_HTTP_ONLY: z.coerce.boolean().optional(),
   SESSION_SECURE: z.coerce.boolean().optional(),
   SESSION_PREFIX: z.string(),

   POSTGRES_USER: z.string().optional(),
   POSTGRES_PASSWORD: z.string().optional(),
   POSTGRES_HOST: z.string().optional(),
   POSTGRES_PORT: z.coerce.number().optional(),
   POSTGRES_DATABASE: z.string().optional(),
   POSTGRES_URL: z.string().optional(),

   REDIS_USER: z.string().optional(),
   REDIS_PASSWORD: z.string().optional(),
   REDIS_HOST: z.string().optional(),
   REDIS_PORT: z.coerce.number().optional(),
   REDIS_URL: z.string().optional(),

   JWT_ACCESS_SECRET: z.string().min(5).optional(),
   JWT_REFRESH_SECRET: z.string().min(5).optional(),
   JWT_ACCESS_EXPIRES_IN: z.string().optional(),
   JWT_REFRESH_EXPIRES_IN: z.string().optional(),

   CLOUDINARY_CLOUD_NAME: z.string().optional(),
   CLOUDINARY_API_KEY: z.string().optional(),
   CLOUDINARY_API_SECRET: z.string().optional(),

   GOOGLE_RECAPTCHA_SECRET_KEY: z.string().optional()

   // MAIL_LOGIN: z.string().optional(),
   // MAIL_PASSWORD: z.string().optional(),
   // MAIL_HOST: z.string().optional(),
   // MAIL_PORT: z.coerce.number().optional(),
   // RESEND_API_KEY: z.string().optional()
})

export type TConfigService = z.infer<typeof envSchema>

const env = envSchema.parse(process.env) // строго типизированно, без any
export const NODE_ENV = env.NODE_ENV
export const isDev = env.NODE_ENV === 'development'
export const isProd = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'
