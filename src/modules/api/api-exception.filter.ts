import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from './api-response.dto';
import { ApiCode } from './api-code.enum';
import { ApiMessage } from './api-message.constant';
import { ApiException } from './api.exception';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ApiCode.UNKNOWN_ERROR;
    let message = ApiMessage[code];
    let data: unknown = null;

    if (exception instanceof Error) {
      code = ApiException.getCode(exception);
      message = ApiMessage[code];

      if (exception instanceof HttpException) {
        status = exception.getStatus();

        // 嘗試獲取原始錯誤消息
        const exceptionResponse = exception.getResponse();
        if (
          typeof exceptionResponse === 'object' &&
          exceptionResponse !== null &&
          'message' in exceptionResponse
        ) {
          data = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message[0]
            : exceptionResponse.message;
        }

        if (exception instanceof ApiException) {
          code = exception.getCode();
          message = exception.message;
        }
      }
    } else {
      // 處理非 Error 類型的異常
      this.logger.warn(`Caught non-Error exception: ${typeof exception}`);

      // 嘗試獲取更多信息
      if (exception !== null && exception !== undefined) {
        try {
          const exceptionStr =
            typeof exception === 'object'
              ? JSON.stringify(exception)
              : String(exception);
          data = exceptionStr;

          this.logger.warn(`Exception details: ${exceptionStr}`);
        } catch (error) {
          this.logger.warn('Failed to stringify exception', error.message);
        }
      }
    }

    // 記錄錯誤
    this.logger.error(
      `${request.method} ${request.url} - ${status}: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    // 回應統一格式的錯誤
    response.status(status).json(ApiResponseDto.error(code, message, data));
  }
}
