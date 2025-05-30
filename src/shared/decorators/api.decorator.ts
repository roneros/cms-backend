// src/shared/decorators/api.decorator.ts
import { applyDecorators, Get, Post } from '@nestjs/common'
import {
   ApiBearerAuth,
   ApiOperation,
   ApiResponse,
   ApiTags
} from '@nestjs/swagger'

export function Api(tags: string) {
   return applyDecorators(ApiTags(tags), ApiBearerAuth())
}

// Пример обёртки под GET + Swagger summary + 200-ответ
export function HttpGet(summary: string, status = 200) {
   return applyDecorators(
      Get(),
      ApiOperation({ summary }),
      ApiResponse({ status, description: 'OK' })
   )
}

// Тоже можно создать HttpPost, HttpDelete и другие
export const HttpPost = (summary: string, status = 201) =>
   applyDecorators(
      Post(),
      ApiOperation({ summary }),
      ApiResponse({ status, description: 'Created' })
   )
