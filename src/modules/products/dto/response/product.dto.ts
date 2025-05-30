import { ApiProperty } from '@nestjs/swagger'

import { CategoryResponseDto } from '@/modules/categories/dto'
import { StorageResponseDto } from '@/modules/storage/dto'
import { SupplierResponseDto } from '@/modules/suppliers/dto'

// src/modules/product/dto/response/product.dto.ts
export class ProductResponseDto {
   @ApiProperty() id: string
   @ApiProperty() article: Number
   @ApiProperty() name: string
   @ApiProperty() amount: Number

   @ApiProperty() price: number
   @ApiProperty() priceBuy: number
   @ApiProperty() percent: number
   @ApiProperty() margin: number
   @ApiProperty() profit: number

   @ApiProperty() discount: Number
   @ApiProperty() country: string

   @ApiProperty() categories: CategoryResponseDto[]
   @ApiProperty() suppliers: SupplierResponseDto[]
   @ApiProperty() storage: StorageResponseDto[]

   @ApiProperty() createdAt: Date
   @ApiProperty() updatedAt: Date
}
