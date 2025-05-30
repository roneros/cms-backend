import {
   ArgumentsHost,
   Catch,
   ExceptionFilter,
   HttpException,
   HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch() // без параметров ловит всё
export class AllExceptionsFilter implements ExceptionFilter {
   catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()

      // Определяем статус
      const status =
         exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR

      // Формируем ответ
      const message =
         exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error'

      // Логируем (можно сюда же отправить в Sentry)
      console.error('Exception caught by filter:', exception)

      response.status(status).json({
         statusCode: status,
         timestamp: new Date().toISOString(),
         path: request.url,
         error: message
      })
   }
}


/**
// Или main.ts
app.useGlobalFilters(new AllExceptionsFilter())
 */

/*
// Или src/core/core.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@/shared/filters/all-exceptions.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // …другие глобальные провайдеры…
  ],
  exports: [],
})
export class CoreModule {}
*/


