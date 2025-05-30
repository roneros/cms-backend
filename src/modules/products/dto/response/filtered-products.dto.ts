// src/modules/product/dto/response/filtered-products.dto.ts
import { ProductResponseDto } from './product.dto'

export class FindAllProductsResponseDto {
   products: ProductResponseDto[]
   total: number
}
