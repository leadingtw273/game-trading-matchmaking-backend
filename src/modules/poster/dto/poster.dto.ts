import { ContactType } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * 聯絡方式的 JSON 對象類型
 * 鍵為 ContactType，值為字符串
 */
type ContactsJson = {
  [key in ContactType]?: string;
};

export class PosterDto {
  @ApiProperty({ description: '發布者 ID' })
  @Expose()
  id: number;

  @ApiProperty({ description: '發布者暱稱' })
  @Expose()
  nickname: string;

  @ApiProperty({ description: '頭像 URL', nullable: true })
  @Expose()
  avatarUrl: string | null;

  @ApiProperty({ description: '遊戲 ID' })
  @Expose()
  gameId: string;

  @ApiProperty({ description: '創建時間', nullable: true })
  @Expose()
  createdAt: Date | null;

  @ApiProperty({ description: '更新時間', nullable: true })
  @Expose()
  updatedAt: Date | null;

  @ApiProperty({
    description: '聯絡方式',
    type: 'object',
    additionalProperties: { type: 'string' },
    example: { LINE: 'user123', TELEGRAM: 'user123' },
  })
  @Expose()
  contacts: ContactsJson;
}
