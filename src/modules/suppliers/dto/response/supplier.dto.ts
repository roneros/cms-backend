// src/modules/suppliers/dto/response/supplier.dto.ts
import { ProductResponseDto } from '@/modules/products/dto'
import { ApiProperty } from '@nestjs/swagger'

export class SupplierResponseDto {
   @ApiProperty({ description: 'ID' })
   id: string

   @ApiProperty({ description: 'Slug' })
   slug: string

   @ApiProperty({ description: 'Name' })
   name: string

   @ApiProperty({ description: 'Email' })
   email: string

   @ApiProperty({ description: 'Website' })
   website: string

   @ApiProperty({ description: 'Address' })
   address: string

   @ApiProperty({ description: 'Requisite' })
   requisite: string

   @ApiProperty({ description: 'Description' })
   description: string

   @ApiProperty({ description: 'Phone number' })
   phoneNumber: string

   @ApiProperty({ type: [ProductResponseDto], description: 'Products' })
   products: ProductResponseDto[]

   @ApiProperty({ description: 'Created at' })
   createdAt: Date

   @ApiProperty({ description: 'Updated at' })
   updatedAt: Date
}
