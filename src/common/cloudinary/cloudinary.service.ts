// src/infra/cloudinary/cloudinary.service.ts
import {
   Injectable,
   InternalServerErrorException,
   Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

import { TConfigService } from '@/core/config/env.config'

@Injectable()
export class CloudinaryService {
   private readonly logger = new Logger(CloudinaryService.name)

   constructor(private readonly configService: ConfigService<TConfigService>) {
      // Конфигурим один раз при старте
      cloudinary.config({
         cloud_name: this.configService.getOrThrow<string>(
            'CLOUDINARY_CLOUD_NAME'
         ),
         api_key: this.configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
         api_secret: this.configService.getOrThrow<string>(
            'CLOUDINARY_API_SECRET'
         )
      })
   }

   async upload(
      folder: string,
      data: Buffer,
      options?: { resource_type?: 'image' | 'video' | 'auto' }
   ): Promise<{ public_id: string; url: string }> {
      try {
         const res = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
               { folder, resource_type: options?.resource_type ?? 'image' },
               (err, result) => {
                  if (err) return reject(err)
                  if (!result)
                     return reject(new Error('Cloudinary returned no result'))
                  return resolve(result) // теперь result точно не undefined
               }
            )
            stream.end(data)
         })

         return { public_id: res.public_id, url: res.secure_url }
      } catch (err) {
         this.logger.error(`Cloudinary upload error`, (err as Error).stack)
         throw new InternalServerErrorException('Media upload failed')
      }
   }

   async delete(publicId: string): Promise<void> {
      try {
         this.logger.log(`Deleting Cloudinary resource: ${publicId}`)
         const result = await cloudinary.uploader.destroy(publicId, {
            invalidate: true // заново пересобрать CDN-кеш
         })
         this.logger.log(
            `Cloudinary destroy result for ${publicId}: ${JSON.stringify(result)}`
         )
      } catch (err) {
         this.logger.error(
            `Failed to delete media ${publicId}`,
            (err as Error).stack
         )
      }
   }

   async deleteByPrefix(prefix: string) {
      try {
         this.logger.log(`Deleting images by prefix: ${prefix}`)
         await cloudinary.api.delete_resources_by_prefix(prefix, {
            resource_type: 'image',
            invalidate: true
         })

         this.logger.log(`Deleting folder (image): ${prefix}`)
         await cloudinary.api.delete_folder(prefix, { resource_type: 'image' })
      } catch (err) {
         this.logger.error(
            `Failed to delete by prefix ${prefix}`,
            (err as Error).stack
         )
      }
   }
}
