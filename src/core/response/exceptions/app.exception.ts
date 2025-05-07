import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseCode } from '../enums/response-code.enum';

export class AppException extends HttpException {
  constructor(
    readonly code: ResponseCode,
    message: string,
    readonly data: unknown = null,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        code,
        message,
        data,
      },
      status,
    );
  }

  // 覆寫 getResponse 方法，返回一個具有明確類型的對象
  getResponse(): { code: number; message: string; data: unknown } {
    return super.getResponse() as {
      code: number;
      message: string;
      data: unknown;
    };
  }
}
