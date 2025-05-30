// src/modules/product/dto/request/query-products.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
   IsArray,
   IsBoolean,
   IsInt,
   IsOptional,
   IsString,
   IsUUID,
   Max,
   Min,
   ValidateNested
} from 'class-validator'

export class QueryProductsDto {
   @ApiProperty()
   @IsOptional()
   @IsString()
   search?: string

   @ApiProperty()
   @IsOptional()
   categorySlugs?: string

   @ApiProperty()
   @IsOptional()
   supplierSlugs?: string

   @ApiProperty()
   @Type(() => Number)
   @IsOptional()
   @IsInt()
   @Min(1)
   page?: number = 1

   @ApiProperty()
   @Type(() => Number)
   @IsOptional()
   @IsInt()
   @Min(1)
   @Max(100)
   limit?: number = 20

   // @Type(() => Boolean)
   // @IsBoolean()
   // isPublished?: boolean
}
