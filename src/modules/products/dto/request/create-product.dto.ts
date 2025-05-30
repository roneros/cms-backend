import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
   ArrayUnique,
   IsArray,
   IsInt,
   IsNotEmpty,
   IsOptional,
   IsString,
   IsUUID,
   Min,
   ValidateNested
} from 'class-validator'

import { CreateCategoryDto } from '@/modules/categories/dto'
import { CreateStorageDto } from '@/modules/storage/dto'
import { CreateSupplierDto } from '@/modules/suppliers/dto'

// src/modules/product/dto/request/create-product.dto.ts
export class CreateProductDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   name: string

   @ApiProperty()
   @IsNotEmpty()
   @Type(() => Number)
   @IsInt()
   @Min(0)
   amount: number

   @ApiProperty()
   @IsNotEmpty()
   @Type(() => String)
   @IsString()
   price: string // Перед сохранение в DB: new Prisma.Decimal(price)

   @ApiProperty()
   @IsNotEmpty()
   @Type(() => String)
   @IsString()
   priceBuy: string // Перед сохранение в DB: new Prisma.Decimal(priceBuy)

   @ApiProperty()
   @IsNotEmpty()
   @Type(() => String)
   @IsString()
   percent: string // Перед сохранение в DB: new Prisma.Decimal(percent)

   @ApiProperty()
   @IsNotEmpty()
   @Type(() => String)
   @IsString()
   margin: string // Перед сохранение в DB: new Prisma.Decimal(margin)

   @ApiProperty()
   @IsNotEmpty()
   @Type(() => String)
   @IsString()
   profit: string // Перед сохранение в DB: new Prisma.Decimal(profit)

   @ApiProperty({ required: false })
   @IsOptional()
   @Type(() => Number)
   @IsInt()
   @Min(0)
   discount?: number

   @ApiProperty()
   @IsOptional()
   @IsString()
   country?: string

   @ApiProperty({ type: [CreateCategoryDto], required: false })
   @Type(() => CreateCategoryDto)
   @IsOptional()
   @IsArray()
   @ArrayUnique()
   @IsUUID('4', { each: true })
   categoryIds?: CreateCategoryDto[]

   @ApiProperty({ type: [CreateSupplierDto], required: false })
   @Type(() => CreateSupplierDto)
   @IsOptional()
   @IsArray()
   @ArrayUnique()
   @IsUUID('4', { each: true })
   supplierIds?: CreateSupplierDto[]

   @ApiProperty({ type: [CreateStorageDto], required: false })
   @Type(() => CreateStorageDto)
   @IsOptional()
   @IsArray()
   @ArrayUnique()
   // @ValidateNested({ each: true }) // что это такое вообще )
   storageIds?: CreateStorageDto[]
}
