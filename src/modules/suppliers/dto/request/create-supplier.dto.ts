// src/modules/suppliers/dto/request/create-supplier.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

import { hostBlocklist } from '@/shared/utils'

export class CreateSupplierDto {
   @ApiProperty({ description: 'Slug', required: false })
   @IsOptional()
   @IsString()
   @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug может состоять только из латиницы, цифр и дефисов'
   })
   slug?: string

   @ApiProperty({ description: 'Name' })
   @IsNotEmpty()
   @IsString()
   name: string

   @ApiProperty({ description: 'Email', required: false })
   @IsOptional()
   @IsString()
   @IsEmail({ host_blacklist: hostBlocklist }, { message: 'Invalid email' })
   email?: string

   @ApiProperty({ description: 'Website', required: false })
   @IsOptional()
   @IsString()
   website?: string

   @ApiProperty({ description: 'Address', required: false })
   @IsOptional()
   @IsString()
   address?: string

   @ApiProperty({ description: 'Requisite', required: false })
   @IsOptional()
   @IsString()
   requisite?: string

   @ApiProperty({ description: 'Description', required: false })
   @IsOptional()
   @IsString()
   description?: string

   @ApiProperty({ description: 'Phone number', required: false })
   @IsOptional()
   @IsString()
   phoneNumber?: string
}
