// src/modules/auth/dto/response/access-token.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class AccessTokenResponseDto {
	@ApiProperty()
   @IsString()
   accessToken: string
}