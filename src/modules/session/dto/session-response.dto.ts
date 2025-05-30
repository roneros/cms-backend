import { ApiProperty } from '@nestjs/swagger'

// src/modules/session/dto/session-response.dto.ts
export class SessionResponseDto {
   @ApiProperty() id: string
   @ApiProperty() createdAt: Date
   @ApiProperty() expiresAt: Date
   @ApiProperty() ip?: string
   @ApiProperty() userAgent?: string
}
