// src/modules/user/dto/request/update-user.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger'

import { CreateUserDto } from './create-user.dto'
import { Type } from 'class-transformer'

export class UpdateUserDto extends PartialType(CreateUserDto) {
   @ApiProperty({ required: false })
   @Type(() => Boolean)
   isBlocked?: boolean
}
