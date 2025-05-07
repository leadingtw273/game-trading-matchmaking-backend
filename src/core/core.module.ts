// core/core.module.ts
import { Module, Global } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorTransformFilter } from './response/filters/error-transform.filter';
import { ResponseTransformInterceptor } from './response/interceptors/response-transform.interceptor';
import { ResponseService } from './response/services/response.service';

@Global()
@Module({
  providers: [
    ResponseService,
    {
      provide: APP_FILTER,
      useClass: ErrorTransformFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class CoreModule {}
