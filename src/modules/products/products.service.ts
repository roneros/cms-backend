import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { QueryProductsDto } from './dto'

@Injectable()
export class ProductsService {
   async findAll(query: QueryProductsDto) {
      const { categorySlugs, supplierSlugs, search, page, limit } = query
      const where: Prisma.ProductWhereInput = {}

      // объединённый поиск по name и article
      if (search) {
         const isNum = /^\d+$/.test(search)
         where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            ...(isNum ? [{ article: parseInt(search, 10) }] : [])
         ]
      }

      if (categorySlugs?.length) {
         where.categories = { some: { slug: { in: categorySlugs } } }
      }

      if (supplierSlugs?.length) {
         where.suppliers = { some: { slug: { in: supplierSlugs } } }
      }
      // if (dto.priceMin != null || dto.priceMax != null) {
      //    where.price = {}
      //    if (dto.priceMin != null)
      //       where.price.gte = new Prisma.Decimal(dto.priceMin)
      //    if (dto.priceMax != null)
      //       where.price.lte = new Prisma.Decimal(dto.priceMax)
      // }
      // …остальная пагинация…
   }
}
