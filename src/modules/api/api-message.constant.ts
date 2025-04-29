import { ApiCode } from './api-code.enum';

/**
 * API 基礎錯誤訊息
 */
export const ApiMessage: Record<ApiCode, string> = {
  [ApiCode.SUCCESS]: '操作成功',

  [ApiCode.BAD_REQUEST]: '錯誤的請求',
  [ApiCode.UNAUTHORIZED]: '未授權',
  [ApiCode.FORBIDDEN]: '禁止訪問',
  [ApiCode.NOT_FOUND]: '資源不存在',
  [ApiCode.METHOD_NOT_ALLOWED]: '方法不允許',
  [ApiCode.CONFLICT]: '重複的資料',
  [ApiCode.NOT_ACCEPTABLE]: '不可接受的請求',
  [ApiCode.PAYLOAD_TOO_LARGE]: '請求體太大',
  [ApiCode.UNSUPPORTED_MEDIA_TYPE]: '不支援的媒體類型',
  [ApiCode.UNPROCESSABLE_ENTITY]: '無法處理的實體',
  [ApiCode.TOO_MANY_REQUESTS]: '請求過多',
  [ApiCode.VALIDATION_FAILED]: '資料驗證失敗',

  [ApiCode.INTERNAL_SERVER_ERROR]: '伺服器內部錯誤',
  [ApiCode.DATABASE_ERROR]: '資料庫錯誤',
  [ApiCode.EXTERNAL_SERVICE_ERROR]: '外部服務錯誤',
  [ApiCode.NOT_IMPLEMENTED]: '尚未實作',
  [ApiCode.SERVICE_UNAVAILABLE]: '服務不可用',
  [ApiCode.GATEWAY_TIMEOUT]: '網關超時',
  [ApiCode.UNKNOWN_ERROR]: '未知錯誤',
};
