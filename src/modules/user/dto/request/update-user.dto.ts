// src/modules/user/dto/request/update-user.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
   @ApiProperty({ required: false })
   @Type(() => Boolean)
   isBlocked?: boolean
}
