import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { PageDto } from '../dto/pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DtoTransformInterceptor implements NestInterceptor {
  constructor(private readonly dtoClass: Type<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // 檢查是否為分頁 DTO
        if (
          this.dtoClass === PageDto ||
          this.dtoClass.prototype instanceof PageDto
        ) {
          const itemType = PageDto.getItemType();
          if (!itemType) {
            throw new Error('PageDto must have an item type specified');
          }

          // 轉換分頁數據
          const items = data.items.map((item: any) =>
            plainToInstance(itemType, item, { excludeExtraneousValues: true }),
          );

          return new PageDto(items, {
            page: data.page,
            size: data.size,
            total: data.total,
            totalPages: data.totalPages,
            hasNextPage: data.hasNextPage,
            hasPreviousPage: data.hasPreviousPage,
          });
        }

        // 處理非分頁 DTO
        return plainToInstance(this.dtoClass, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
