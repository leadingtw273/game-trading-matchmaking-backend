import { HttpStatus } from '@nestjs/common';
import { ApiCode } from './api-code.enum';

/**
 * API 常用 status code 對應
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const ApiStatusCode: Partial<Record<HttpStatus, ApiCode>> = {
  [HttpStatus.BAD_REQUEST]: ApiCode.BAD_REQUEST,
  [HttpStatus.UNAUTHORIZED]: ApiCode.UNAUTHORIZED,
  [HttpStatus.FORBIDDEN]: ApiCode.FORBIDDEN,
  [HttpStatus.NOT_FOUND]: ApiCode.NOT_FOUND,
  [HttpStatus.METHOD_NOT_ALLOWED]: ApiCode.METHOD_NOT_ALLOWED,
  [HttpStatus.NOT_ACCEPTABLE]: ApiCode.NOT_ACCEPTABLE,
  [HttpStatus.CONFLICT]: ApiCode.CONFLICT,
  [HttpStatus.PAYLOAD_TOO_LARGE]: ApiCode.PAYLOAD_TOO_LARGE,
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: ApiCode.UNSUPPORTED_MEDIA_TYPE,
  [HttpStatus.UNPROCESSABLE_ENTITY]: ApiCode.UNPROCESSABLE_ENTITY,
  [HttpStatus.TOO_MANY_REQUESTS]: ApiCode.TOO_MANY_REQUESTS,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ApiCode.INTERNAL_SERVER_ERROR,
  [HttpStatus.NOT_IMPLEMENTED]: ApiCode.NOT_IMPLEMENTED,
  [HttpStatus.SERVICE_UNAVAILABLE]: ApiCode.SERVICE_UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: ApiCode.GATEWAY_TIMEOUT,
};
