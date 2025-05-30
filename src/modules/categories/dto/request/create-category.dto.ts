// src/modules/categories/dto/request/create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Matches } from 'class-validator'

export class CreateCategoryDto {
   @ApiProperty({ description: 'Slug', required: false })
   @IsOptional()
   @IsString()
   @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug может состоять только из латиницы, цифр и дефисов'
   })
   slug?: string

   @ApiProperty({ description: 'Name' })
   @IsString()
   name: string
}
