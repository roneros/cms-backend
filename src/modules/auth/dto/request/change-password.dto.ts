// src/modules/auth/dto/change-password.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsNotEmpty, IsString, Length } from 'class-validator'

import { MatchPassword } from '@/shared/decorators'

export class ChangePasswordDto implements Partial<User> {
   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'Password is required' })
   @IsString({ message: 'password must be a string' })
   @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
   password: string

   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'Password is required' })
   @IsString({ message: 'password must be a string' })
   @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
   newPassword: string

   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'newPassword is required' })
   @IsString({ message: 'Password must be a string' })
   @MatchPassword<ChangePasswordDto>('newPassword', {
      message: 'Passwords do not match'
   })
   matchPassword: string
}
