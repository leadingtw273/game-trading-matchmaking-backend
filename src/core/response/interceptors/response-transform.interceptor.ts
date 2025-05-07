import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果回應已經是 ResponseDto 格式，則直接返回
        if (data instanceof ResponseDto) {
          return data;
        }

        // 否則，將回應包裝為成功的 ResponseDto
        return ResponseDto.success(data);
      }),
    );
  }
}
