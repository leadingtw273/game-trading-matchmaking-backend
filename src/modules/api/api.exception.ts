import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiCode } from './api-code.enum';
import { ApiStatusCode } from './api-status-code.constant';
import { QueryFailedError } from 'typeorm';

export class ApiException extends HttpException {
  constructor(
    protected readonly code: number,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        code,
        message,
      },
      status,
    );
  }

  // 添加公共方法來獲取 code
  getCode(): number {
    return this.code;
  }

  // 覆寫 getResponse 方法，返回一個具有明確類型的對象
  getResponse(): { code: number; message: string } {
    return super.getResponse() as { code: number; message: string };
  }

  static getCode(error: Error): ApiCode {
    if (error instanceof ApiException) {
      return error.getCode();
    } else if (error instanceof HttpException) {
      const status = error.getStatus();
      return ApiStatusCode[status] ?? ApiCode.UNKNOWN_ERROR;
    } else if (error instanceof QueryFailedError) {
      return ApiCode.DATABASE_ERROR;
    } // 後續補上其他錯誤類型的處理

    return ApiCode.UNKNOWN_ERROR;
  }
}
