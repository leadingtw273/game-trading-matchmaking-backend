import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commodities } from './commodity.entity';
import { CurrencyType } from '@/common/enums';

@Index(
  'idx_coin_commodities',
  ['amount', 'coinRatioCurrency', 'coinRatioValue', 'id'],
  {},
)
@Index('uq_coin_commodities_commodity_id', ['commodityId'], { unique: true })
@Index('pk_coin_commodities', ['id'], { unique: true })
@Entity('coin_commodities', { schema: 'public' })
export class CoinCommodities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'commodity_id', unique: true })
  commodityId: number;

  @Column('numeric', { name: 'coin_ratio_value' })
  coinRatioValue: string;

  @Column('enum', {
    name: 'coin_ratio_currency',
    enum: CurrencyType,
  })
  coinRatioCurrency: CurrencyType;

  @Column('numeric', { name: 'amount' })
  amount: string;

  @Column('integer', { name: 'trans_min_limit' })
  transMinLimit: number;

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

  @OneToOne(() => Commodities, (commodities) => commodities.coinCommodities)
  @JoinColumn([{ name: 'commodity_id', referencedColumnName: 'id' }])
  commodity: Commodities;
}
