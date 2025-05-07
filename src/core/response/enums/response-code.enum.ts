/**
 * Response 業務回應代碼
 * 範圍：0-999
 */
export enum ResponseCode {
  // 成功相關 (0-99)
  SUCCESS = 1, // 操作成功

  // 客戶端錯誤 (100-199)
  BAD_REQUEST = 100, // 錯誤的請求
  UNAUTHORIZED = 101, // 未授權
  FORBIDDEN = 103, // 禁止訪問
  NOT_FOUND = 104, // 資源不存在
  METHOD_NOT_ALLOWED = 105, // 方法不允許
  CONFLICT = 106, // 重複的資料
  NOT_ACCEPTABLE = 107, // 不可接受的請求
  PAYLOAD_TOO_LARGE = 108, // 請求體太大
  UNSUPPORTED_MEDIA_TYPE = 109, // 不支援的媒體類型
  UNPROCESSABLE_ENTITY = 110, // 無法處理的實體
  TOO_MANY_REQUESTS = 111, // 請求過多
  VALIDATION_FAILED = 112, // 資料驗證失敗

  // 系統錯誤 (500-599)
  INTERNAL_SERVER_ERROR = 500, // 伺服器內部錯誤
  DATABASE_ERROR = 501, // 資料庫錯誤
  EXTERNAL_SERVICE_ERROR = 502, // 外部服務錯誤
  NOT_IMPLEMENTED = 503, // 尚未實作
  SERVICE_UNAVAILABLE = 504, // 服務不可用
  GATEWAY_TIMEOUT = 505, // 網關超時
  UNKNOWN_ERROR = 599, // 未知錯誤
}
