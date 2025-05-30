// src/modules/suppliers/dto/request/update-supplier.dto.ts
import { PartialType } from '@nestjs/swagger'

import { CreateSupplierDto } from './create-supplier.dto'

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
