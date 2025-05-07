import { HttpStatus } from '@nestjs/common';
import { ResponseCode } from '../enums/response-code.enum';

/**
 * 將常用 HTTP 狀態碼對應到回應代碼。
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const StatusCodeMapping: Partial<Record<HttpStatus, ResponseCode>> = {
  [HttpStatus.BAD_REQUEST]: ResponseCode.BAD_REQUEST,
  [HttpStatus.UNAUTHORIZED]: ResponseCode.UNAUTHORIZED,
  [HttpStatus.FORBIDDEN]: ResponseCode.FORBIDDEN,
  [HttpStatus.NOT_FOUND]: ResponseCode.NOT_FOUND,
  [HttpStatus.METHOD_NOT_ALLOWED]: ResponseCode.METHOD_NOT_ALLOWED,
  [HttpStatus.NOT_ACCEPTABLE]: ResponseCode.NOT_ACCEPTABLE,
  [HttpStatus.CONFLICT]: ResponseCode.CONFLICT,
  [HttpStatus.PAYLOAD_TOO_LARGE]: ResponseCode.PAYLOAD_TOO_LARGE,
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: ResponseCode.UNSUPPORTED_MEDIA_TYPE,
  [HttpStatus.UNPROCESSABLE_ENTITY]: ResponseCode.UNPROCESSABLE_ENTITY,
  [HttpStatus.TOO_MANY_REQUESTS]: ResponseCode.TOO_MANY_REQUESTS,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ResponseCode.INTERNAL_SERVER_ERROR,
  [HttpStatus.NOT_IMPLEMENTED]: ResponseCode.NOT_IMPLEMENTED,
  [HttpStatus.SERVICE_UNAVAILABLE]: ResponseCode.SERVICE_UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: ResponseCode.GATEWAY_TIMEOUT,
};
