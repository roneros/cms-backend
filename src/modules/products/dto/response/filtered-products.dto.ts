import { ApiProperty } from '@nestjs/swagger'

import { ProductResponseDto } from './product.dto'

// src/modules/product/dto/response/filtered-products.dto.ts
export class FindAllProductsResponseDto {
   @ApiProperty({ type: () => [ProductResponseDto] })
   data: ProductResponseDto[]

   @ApiProperty() page: number
   @ApiProperty() limit: number
   @ApiProperty() total: number
}
