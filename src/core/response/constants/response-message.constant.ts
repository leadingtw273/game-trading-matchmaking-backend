import { ResponseCode } from '../enums/response-code.enum';

/**
 * Response 預設錯誤訊息
 */
export const ResponseMessage: Record<ResponseCode, string> = {
  [ResponseCode.SUCCESS]: '操作成功',

  [ResponseCode.BAD_REQUEST]: '錯誤的請求',
  [ResponseCode.UNAUTHORIZED]: '未授權',
  [ResponseCode.FORBIDDEN]: '禁止訪問',
  [ResponseCode.NOT_FOUND]: '資源不存在',
  [ResponseCode.METHOD_NOT_ALLOWED]: '方法不允許',
  [ResponseCode.CONFLICT]: '重複的資料',
  [ResponseCode.NOT_ACCEPTABLE]: '不可接受的請求',
  [ResponseCode.PAYLOAD_TOO_LARGE]: '請求體太大',
  [ResponseCode.UNSUPPORTED_MEDIA_TYPE]: '不支援的媒體類型',
  [ResponseCode.UNPROCESSABLE_ENTITY]: '無法處理的實體',
  [ResponseCode.TOO_MANY_REQUESTS]: '請求過多',
  [ResponseCode.VALIDATION_FAILED]: '參數驗證失敗',

  [ResponseCode.INTERNAL_SERVER_ERROR]: '伺服器內部錯誤',
  [ResponseCode.DATABASE_ERROR]: '資料庫錯誤',
  [ResponseCode.EXTERNAL_SERVICE_ERROR]: '外部服務錯誤',
  [ResponseCode.NOT_IMPLEMENTED]: '尚未實作',
  [ResponseCode.SERVICE_UNAVAILABLE]: '服務不可用',
  [ResponseCode.GATEWAY_TIMEOUT]: '網關超時',
  [ResponseCode.UNKNOWN_ERROR]: '未知錯誤',
};
