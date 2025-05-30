// src/modules/storage/dto/request/create-storage.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { StorageType } from '@prisma/client'
import { IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateStorageDto {
	@ApiProperty({ enum: StorageType, required: false })
	@IsOptional()
	@IsString()
   type: StorageType

	@ApiProperty()
	@IsString()
   size: string

	@ApiProperty()
	@IsUrl()
   url: string

	@ApiProperty()
   publicId: string
}
