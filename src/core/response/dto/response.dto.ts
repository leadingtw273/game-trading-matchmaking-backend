import { ApiProperty } from '@nestjs/swagger';
import { ResponseCode } from '../enums/response-code.enum';
import { ResponseMessage } from '../constants/response-message.constant';

export class ResponseDto<T> {
  @ApiProperty({
    description: '狀態碼',
    example: ResponseCode.SUCCESS,
  })
  code: number;

  @ApiProperty({
    description: '回應訊息',
    example: ResponseMessage[ResponseCode.SUCCESS],
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
    message: string = ResponseMessage[ResponseCode.SUCCESS],
  ): ResponseDto<T> {
    return new ResponseDto<T>(ResponseCode.SUCCESS, message, data);
  }

  static error<T>(
    code: number = ResponseCode.INTERNAL_SERVER_ERROR,
    message: string = ResponseMessage[ResponseCode.INTERNAL_SERVER_ERROR],
    data: T = null,
  ): ResponseDto<T> {
    return new ResponseDto<T>(code, message, data);
  }
}
