// src/modules/product/dto/request/update-product.dto.ts
import { PartialType } from '@nestjs/swagger'

import { CreateProductDto } from './create-product.dto'

export class UpdateProductDto extends PartialType(CreateProductDto) {}
