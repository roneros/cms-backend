import { Controller } from '@nestjs/common'

import { ProductsMediaService } from './products-media.service'

@Controller('products-media')
export class ProductsMediaController {
   constructor(private readonly productsMediaService: ProductsMediaService) {}
}
