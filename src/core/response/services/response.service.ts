import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { AppException } from '../exceptions/app.exception';
import { ResponseCode } from '../enums/response-code.enum';
import { ResponseMessage } from '../constants/response-message.constant';
import { StatusCodeMapping } from '../constants/status-code-mapping.constant';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';

@Injectable()
export class ResponseService {
  private readonly logger = new Logger(ResponseService.name);

  /**
   * 將各種錯誤轉換為標準的 API 響應格式
   */
  convertErrorToResponse(exception: unknown): ResponseDto<unknown> {
    this.logger.error(
      `Original exception:`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    // 如果已經是 AppException，直接使用其信息
    if (exception instanceof AppException) {
      return ResponseDto.error(
        exception.code,
        exception.message,
        exception.data,
      );
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ResponseCode.UNKNOWN_ERROR;
    let message = ResponseMessage[ResponseCode.UNKNOWN_ERROR];
    let data: unknown = null;

    // 處理 HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = StatusCodeMapping[status] ?? ResponseCode.UNKNOWN_ERROR;
      message = ResponseMessage[code];

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
    }
    // 處理數據庫錯誤
    else if (exception instanceof QueryFailedError) {
      code = ResponseCode.DATABASE_ERROR;
      message = ResponseMessage[ResponseCode.DATABASE_ERROR];
    } else if (exception instanceof ValidationError) {
      code = ResponseCode.VALIDATION_FAILED;
      message = ResponseMessage[ResponseCode.VALIDATION_FAILED];
      data = exception;
    }
    // 處理其他類型的錯誤
    else if (exception instanceof Error) {
      message =
        exception.message || ResponseMessage[ResponseCode.UNKNOWN_ERROR];
    }

    // 記錄轉換後的錯誤
    this.logger.error(`Converted error: [${code}] ${message}`);

    return ResponseDto.error(code, message, data);
  }

  /**
   * 獲取 HTTP 狀態碼
   */
  getHttpStatus(exception: unknown): HttpStatus {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
