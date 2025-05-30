import { Category } from '@prisma/client'

// src/modules/product/dto/request/create-product.dto.ts
export class CreateProductDto {
   name: string

   categories: Category[]

   providers: string[]
}
