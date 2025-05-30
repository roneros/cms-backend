// src/modules/user/dto/request/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
   IsEmail,
   IsEnum,
   IsNotEmpty,
   IsOptional,
   IsString,
   Length,
   Matches
} from 'class-validator'

import { hostBlocklist } from '@/shared/utils'

export class CreateUserDto {
   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'displayName is required' })
   @IsString({ message: 'displayName must be a string' })
   @Matches(/^[a-z0-9]+$/, {
      message:
         'Имя пользователя может содержать только строчные латинские буквы и цифры'
   })
   username: string

   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'Password is required' })
   @IsString({ message: 'password must be a string' })
   @Length(8, 100, { message: 'Password must be between 8 and 100 characters' })
   password: string

   @ApiProperty({ required: true })
   @IsNotEmpty({ message: 'displayName is required' })
   @IsString({ message: 'displayName must be a string' })
   displayName: string

   @ApiProperty({
      enum: Role,
      default: Role.CASHIER,
      description: 'Роль работника',
      required: false
   })
   @Type(() => String)
   @IsString()
   @IsOptional()
   @IsEnum(Role, {
      message: 'Role must be one of CASHIER|STOREKEEPER|MANAGER|ADMIN'
   })
   role?: Role

   @ApiProperty()
   @IsOptional()
   @IsString({ message: 'email must be a string' })
   @IsEmail({ host_blacklist: hostBlocklist }, { message: 'Invalid email' })
   email?: string

   @ApiProperty()
   @Type(() => String)
   @IsOptional()
   @IsString({ message: 'phoneNumber must be a string' })
   phoneNumber?: string

   constructor(partial: Partial<CreateUserDto>) {
      Object.assign(this, partial)
   }
}

// const dto = new RegisterDto({ accessToken: someToken });
