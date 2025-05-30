import { Controller, Get, Query } from '@nestjs/common'

import { ProductsService } from './products.service'
import { QueryProductsDto } from './dto'

@Controller('products')
export class ProductsController {
   constructor(private readonly productsService: ProductsService) {}

   @Get()
   findAll(@Query() query: QueryProductsDto) {
      return this.productsService.findAll(query)
   }
   
}
