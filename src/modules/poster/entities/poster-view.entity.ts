import { ViewEntity, ViewColumn, DataSource, PrimaryColumn } from 'typeorm';
import { ContactType } from '@/common/enums';

/**
 * 聯絡方式的 JSON 對象類型
 * 鍵為 ContactType，值為字符串
 */
type ContactsJson = {
  [key in ContactType]?: string;
};

/**
 * 發布者視圖實體
 * 映射到 posters_view 視圖
 */
@ViewEntity({
  name: 'posters_view',
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('p.*')
      .addSelect(
        `(
          SELECT jsonb_object_agg(pc.type, pc.value)
          FROM poster_contacts pc
          WHERE pc.poster_id = p.id
        )`,
        'contacts',
      )
      .from('posters', 'p'),
})
export class PosterView {
  @ViewColumn()
  @PrimaryColumn()
  id: number;

  @ViewColumn()
  nickname: string;

  @ViewColumn({ name: 'avatar_url' })
  avatarUrl: string | null;

  @ViewColumn({ name: 'game_id' })
  gameId: string;

  @ViewColumn({ name: 'created_at' })
  createdAt: Date | null;

  @ViewColumn({ name: 'updated_at' })
  updatedAt: Date | null;

  /**
   * 聯絡方式 JSON 對象
   * 由 poster_contacts 表聚合而來
   * 結構為: { [ContactType]: string }
   */
  @ViewColumn({ name: 'contacts' })
  contacts: ContactsJson;

  /**
   * 獲取特定類型的聯絡方式
   * @param type 聯絡方式類型
   * @returns 聯絡方式值，如果不存在則返回 null
   */
  getContact(type: ContactType): string | null {
    if (!this.contacts) return null;
    return this.contacts[type] || null;
  }

  /**
   * 檢查是否有特定類型的聯絡方式
   * @param type 聯絡方式類型
   * @returns 是否存在該聯絡方式
   */
  hasContact(type: ContactType): boolean {
    if (!this.contacts) return false;
    return !!this.contacts[type];
  }

  /**
   * 獲取所有聯絡方式類型
   * @returns 聯絡方式類型數組
   */
  getContactTypes(): ContactType[] {
    if (!this.contacts) return [];
    return Object.keys(this.contacts) as ContactType[];
  }
}
