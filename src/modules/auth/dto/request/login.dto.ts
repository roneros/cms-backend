// src/modules/auth/dto/request/login-user.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'Password is required' })
   @IsString()
   login: string

   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'Password is required' })
   @IsString()
   password: string
}
