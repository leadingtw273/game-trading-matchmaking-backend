import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppearanceCommodities } from './commodityAppearance.entity';
import { CharacterCommodities } from './commodityCharacter.entity';
import { CoinCommodities } from './commodityCoin.entity';
import { Transactions } from '@/modules/transaction/entities/transaction.entity';
import { CommodityType } from '@/common/enums';

@Index('idx_commodities', ['id', 'type'], {})
@Index('pk_commodities', ['id'], { unique: true })
@Entity('commodities', { schema: 'public' })
export class Commodities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('enum', { name: 'type', enum: CommodityType })
  type: CommodityType;

  @Column('text', { name: 'remark', nullable: true })
  remark: string | null;

  @Column('varchar', { name: 'tags', nullable: true, array: true })
  tags: string[] | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'now()',
  })
  updatedAt: Date | null;

  @OneToOne(
    () => AppearanceCommodities,
    (appearanceCommodities) => appearanceCommodities.commodity,
  )
  appearanceCommodities: AppearanceCommodities;

  @OneToOne(
    () => CharacterCommodities,
    (characterCommodities) => characterCommodities.commodity,
  )
  characterCommodities: CharacterCommodities;

  @OneToOne(
    () => CoinCommodities,
    (coinCommodities) => coinCommodities.commodity,
  )
  coinCommodities: CoinCommodities;

  @OneToMany(() => Transactions, (transactions) => transactions.commodity)
  transactions: Transactions[];
}
