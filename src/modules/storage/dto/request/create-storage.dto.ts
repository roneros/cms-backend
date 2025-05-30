// src/modules/storage/dto/request/create-storage.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { StorageType } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

export class CreateStorageDto {
   @ApiProperty({ enum: StorageType, required: false })
   @IsOptional()
   @IsString()
   type: StorageType

   @ApiProperty()
   @IsString()
   size: string // 'thumb' | 'medium' | 'full' | 'video'

   @ApiProperty()
   @IsString()
   url: string

   @ApiProperty()
   publicId: string
}
