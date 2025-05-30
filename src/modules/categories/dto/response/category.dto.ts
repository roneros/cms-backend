// src/modules/categories/dto/response/category.dto.ts
import { ProductResponseDto } from '@/modules/products/dto/response/product.dto'
import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponseDto {
	@ApiProperty() id: string
	@ApiProperty() slug: string
	@ApiProperty() name: string
	@ApiProperty({ type: [ProductResponseDto] }) products: ProductResponseDto[]
}