import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Type as NestType } from '@nestjs/common'; // 重命名為 NestType

export class PageOptionsDto {
  @ApiProperty({
    description: '目前頁碼 (從1開始)',
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    description: '每頁項目數量',
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  size: number = 10;

  @ApiProperty({
    description: '排序方向',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    required: false,
  })
  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  order?: 'ASC' | 'DESC' = 'DESC';

  @ApiProperty({
    description: '排序欄位',
    default: 'createdAt',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderBy?: string = 'createdAt';

  get skip(): number {
    return (this.page - 1) * this.size;
  }
}

export class PageDto<T> {
  @ApiProperty({ isArray: true, description: '資料列表' })
  readonly list: T[];

  @ApiProperty({ description: '當前頁碼' })
  readonly page: number;

  @ApiProperty({ description: '每頁項目數量' })
  readonly size: number;

  @ApiProperty({ description: '總項目數量' })
  readonly total: number;

  @ApiProperty({ description: '總頁數' })
  readonly totalPages: number;

  @ApiProperty({ description: '是否有下一頁' })
  readonly hasNextPage: boolean;

  @ApiProperty({ description: '是否有上一頁' })
  readonly hasPreviousPage: boolean;

  constructor(items: T[], meta: Partial<PageDto<T>>) {
    this.list = items;
    Object.assign(this, meta);
  }

  // 靜態屬性存儲項目類型
  private static readonly itemTypeKey = Symbol('itemType');

  /**
   * 創建分頁 DTO 並設置項目類型
   */
  static create<T>(itemType: NestType<T>): NestType<PageDto<T>> {
    Reflect.defineMetadata(this.itemTypeKey, itemType, this);
    return this as NestType<PageDto<T>>;
  }

  /**
   * 獲取分頁項目的 DTO 類型
   */
  static getItemType(): NestType<unknown> {
    return Reflect.getMetadata(this.itemTypeKey, this);
  }
}
