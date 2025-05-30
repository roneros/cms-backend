// src/modules/product/dto/request/query-products.dto.ts
import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator'

export class QueryProductsDto {
   @IsString()
   @IsOptional()
   name?: string

   @IsUUID()
   @IsOptional()
   categoryId?: string

   @IsUUID()
   @IsOptional()
   providerId?: string

   @Type(() => Number)
   @IsInt()
   @Min(1)
   @IsOptional()
   page?: number = 1

   @Type(() => Number)
   @IsInt()
   @Min(1)
   @Max(100)
   @IsOptional()
   limit?: number = 20
}
