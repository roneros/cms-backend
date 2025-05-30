// src/modules/product/dto/request/query-products.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
   ArrayUnique,
   IsArray,
   IsInt,
   IsOptional,
   IsString,
   Max,
   Min
} from 'class-validator'

export class QueryProductsDto {
   @ApiProperty({
      type: String,
      required: false,
      description: 'Поиск по имени или артикулу'
   })
   @IsOptional()
   @IsString()
   search?: string

   @ApiProperty({
      type: String,
      isArray: true,
      required: false,
      description: 'Slug категорий (массив или CSV)'
   })
   @IsOptional()
   @Transform(({ value }) =>
      Array.isArray(value)
         ? value
         : (value as string).split(',').filter(Boolean)
   )
   @IsArray()
   @ArrayUnique()
   @IsString({ each: true })
   categorySlugs?: string[]

   @ApiProperty({
      type: String,
      isArray: true,
      required: false,
      description: 'Slug поставщиков (массив или CSV)'
   })
   @IsOptional()
   @Transform(({ value }) =>
      Array.isArray(value)
         ? value
         : (value as string).split(',').filter(Boolean)
   )
   @IsArray()
   @ArrayUnique()
   @IsString({ each: true })
   supplierSlugs?: string[]

   @ApiProperty({ type: Number, required: false, default: 1, minimum: 1 })
   @Type(() => Number)
   @IsOptional()
   @IsInt()
   @Min(1)
   page?: number = 1

   @ApiProperty({
      type: Number,
      required: false,
      default: 20,
      minimum: 1,
      maximum: 100
   })
   @Type(() => Number)
   @IsOptional()
   @IsInt()
   @Min(1)
   @Max(100)
   limit?: number = 20

   // // Пример дополнительных фильтров:
   // @ApiProperty({ description: 'Минимальная цена', required: false })
   // @IsOptional()
   // @Type(() => Number)
   // @Min(0)
   // priceMin?: number

   // @ApiProperty({ description: 'Максимальная цена', required: false })
   // @IsOptional()
   // @Type(() => Number)
   // @Min(0)
   // priceMax?: number
}
