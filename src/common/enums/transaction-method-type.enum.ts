/** 交易方式類型 */
export enum TransactionMethodType {
  /** 付費信件 */
  PAID_LETTER = 'PAID_LETTER',
  /** 玩家交易 */
  PLAYER_TRADE = 'PLAYER_TRADE',
  /** 銀行轉帳 */
  BANK_TRANSFER = 'BANK_TRANSFER',
  /** LINE Pay支付 */
  LINE_PAY = 'LINE_PAY',
  /** 第三方平台8591 */
  THIRD_PARTY_8591 = 'THIRD_PARTY_8591',
}
