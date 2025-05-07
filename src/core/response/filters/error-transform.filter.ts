import { ResponseService } from '../services/response.service';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorTransformFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorTransformFilter.name);

  constructor(private readonly responseService: ResponseService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 使用 ResponseService 轉換錯誤
    const responseContent =
      this.responseService.convertErrorToResponse(exception);
    const status = this.responseService.getHttpStatus(exception);

    // 記錄錯誤
    this.logger.error(
      `${request.method} ${request.url} - ${status}: [${responseContent.code}] ${responseContent.message}: ${responseContent.data}`,
    );

    // 直接返回轉換後的響應
    response.status(status).json(responseContent);
  }
}
