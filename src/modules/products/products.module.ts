import { Module } from '@nestjs/common'

import { CategoriesModule } from '../categories/categories.module'
import { StorageModule } from '../storage/storage.module'
import { SuppliersModule } from '../suppliers/suppliers.module'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
   imports: [CategoriesModule, SuppliersModule, StorageModule],
   controllers: [ProductsController],
   providers: [ProductsService]
})
export class ProductsModule {}
