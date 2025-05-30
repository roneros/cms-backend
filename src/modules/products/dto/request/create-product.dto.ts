// src/modules/product/dto/request/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
   ArrayUnique,
   IsArray,
   IsDecimal,
   IsInt,
   IsNotEmpty,
   IsOptional,
   IsString,
   IsUUID,
   Min,
   ValidateNested
} from 'class-validator'

import { CreateStorageDto } from '@/modules/storage/dto'

export class CreateProductDto {
   @ApiProperty({ type: String })
   @IsNotEmpty()
   @IsString()
   name: string

   @ApiProperty({ type: Number })
   @Type(() => Number)
   @IsNotEmpty()
   @IsInt()
   @Min(0)
   amount: number

   @ApiProperty({ type: String })
   @IsNotEmpty()
   @IsDecimal({ decimal_digits: '1,2' })
   price: string // Перед сохранение в DB: new Prisma.Decimal(price)

   @ApiProperty({ type: String })
   @IsNotEmpty()
   @IsDecimal({ decimal_digits: '1,2' })
   priceBuy: string // Перед сохранение в DB: new Prisma.Decimal(priceBuy)

   @ApiProperty({ type: String })
   @IsNotEmpty()
   @IsDecimal({ decimal_digits: '1,2' })
   percent: string // Перед сохранение в DB: new Prisma.Decimal(percent)

   @ApiProperty({ type: String })
   @IsNotEmpty()
   @IsDecimal({ decimal_digits: '1,2' })
   margin: string // Перед сохранение в DB: new Prisma.Decimal(margin)

   @ApiProperty({ type: String })
   @IsNotEmpty()
   @IsDecimal({ decimal_digits: '1,2' })
   profit: string // Перед сохранение в DB: new Prisma.Decimal(profit)

   @ApiProperty({ type: Number, required: false, default: 0 })
   @IsOptional()
   @Type(() => Number)
   @IsInt()
   @Min(0)
   discount?: number

   @ApiProperty({ type: String, required: false })
   @IsOptional()
   @IsString()
   country?: string

   @ApiProperty({
      type: String,
      isArray: true,
      required: false,
      description: 'UUID категорий'
   })
   @IsOptional()
   @IsArray()
   @ArrayUnique()
   @IsUUID('4', { each: true })
   categoryIds?: string[]

   @ApiProperty({
      type: String,
      isArray: true,
      required: false,
      description: 'UUID поставщиков'
   })
   @IsOptional()
   @IsArray()
   @ArrayUnique()
   @IsUUID('4', { each: true })
   supplierIds?: string[]

   @ApiProperty({
      type: () => CreateStorageDto,
      isArray: true,
      required: false,
      description: 'Медиа-файлы (уже загруженные на Cloudinary)'
   })
   @IsOptional()
   @IsArray()
   @ValidateNested({ each: true }) // валидировать каждый элемент по CreateMediaDto
   @Type(() => CreateStorageDto) // превратить каждый plain-object → CreateMediaDto
   storage?: CreateStorageDto[]
}
