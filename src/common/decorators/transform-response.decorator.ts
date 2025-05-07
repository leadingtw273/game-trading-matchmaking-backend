// src/common/decorators/transform-response.decorator.ts
import { applyDecorators, UseInterceptors, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { DtoTransformInterceptor } from '../interceptors/dto-transform.interceptor';
import { PageDto } from '../dto/pagination.dto';
import { ResponseDto } from '@/core/response/dto/response.dto';

export function TransformResponse(
  dtoClass: Type<any>,
  options?: {
    description?: string;
    additionalResponses?: Array<{ status: number; description: string }>;
  },
) {
  const decorators = [UseInterceptors(new DtoTransformInterceptor(dtoClass))];

  if (dtoClass === PageDto || dtoClass.prototype instanceof PageDto) {
    const itemType = PageDto.getItemType();

    decorators.push(ApiExtraModels(ResponseDto, PageDto, itemType));
    decorators.push(
      ApiOkResponse({
        description: options?.description || '請求成功',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                data: {
                  allOf: [
                    { $ref: getSchemaPath(PageDto) },
                    {
                      properties: {
                        list: {
                          type: 'array',
                          items: { $ref: getSchemaPath(itemType) },
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      }),
    );
  } else {
    decorators.push(ApiExtraModels(ResponseDto, dtoClass));
    decorators.push(
      ApiOkResponse({
        description: options?.description || '請求成功',
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(dtoClass),
                },
              },
            },
          ],
        },
      }),
    );
  }

  // 添加額外的響應狀態
  if (options?.additionalResponses) {
    options.additionalResponses.forEach((response) => {
      decorators.push(
        ApiResponse({
          status: response.status,
          description: response.description,
        }),
      );
    });
  }

  return applyDecorators(...decorators);
}
