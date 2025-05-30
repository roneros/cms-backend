// src/modules/user/dto/request/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export class UserResponseDto {
   @ApiProperty() id: string
   @ApiProperty() username: string
   @ApiProperty() password: string
   @ApiProperty() displayName: string
   @ApiProperty() role: Role
   @ApiProperty() email: string
   @ApiProperty() phoneNumber: string
   @ApiProperty() isBlocked: boolean
   @ApiProperty() createdAt: Date
   @ApiProperty() updatedAt: Date
}
