import { ApiProperty } from '@nestjs/swagger';
import { ApiCode } from './api-code.enum';
import { ApiMessage } from './api-message.constant';

export class ApiResponseDto<T> {
  @ApiProperty({
    description: '狀態碼',
    example: ApiCode.SUCCESS,
  })
  code: number;

  @ApiProperty({
    description: '回應訊息',
    example: ApiMessage[ApiCode.SUCCESS],
  })
  message: string;

  @ApiProperty({ description: '回應資料' })
  data: T;

  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    data: T,
    message: string = ApiMessage[ApiCode.SUCCESS],
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(ApiCode.SUCCESS, message, data);
  }

  static error<T>(
    code: number = ApiCode.INTERNAL_SERVER_ERROR,
    message: string = ApiMessage[ApiCode.INTERNAL_SERVER_ERROR],
    data: T = null,
  ): ApiResponseDto<T> {
    return new ApiResponseDto<T>(code, message, data);
  }
}
