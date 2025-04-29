import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from './api-response.dto';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果回應已經是 ApiResponseDto 格式，則直接返回
        if (data instanceof ApiResponseDto) {
          return data;
        }

        // 否則，將回應包裝為成功的 ApiResponseDto
        return ApiResponseDto.success(data);
      }),
    );
  }
}
