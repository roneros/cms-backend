// src/modules/storage/dto/response/storage.dto.ts
import { ApiProperty } from '@nestjs/swagger'

export class StorageResponseDto {
   @ApiProperty() url: string
   @ApiProperty() publicId: string
}
