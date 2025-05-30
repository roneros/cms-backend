import { Module } from '@nestjs/common'

import { ProductsMediaController } from './products-media.controller'
import { ProductsMediaService } from './products-media.service'

@Module({
   controllers: [ProductsMediaController],
   providers: [ProductsMediaService]
})
export class ProductsMediaModule {}
