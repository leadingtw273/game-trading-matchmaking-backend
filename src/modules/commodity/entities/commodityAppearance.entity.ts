import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commodities } from './commodity.entity';
import { AppearanceType, CurrencyType } from '@/common/enums';

@Index(
  'idx_appearance_commodities',
  ['category', 'id', 'name', 'priceCurrency', 'priceValue'],
  {},
)
@Index('idx_appearance_commodities_name', ['name'], {})
@Index('uq_appearance_commodities_commodity_id', ['commodityId'], {
  unique: true,
})
@Index('pk_appearance_commodities', ['id'], { unique: true })
@Entity('appearance_commodities', { schema: 'public' })
export class AppearanceCommodities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'commodity_id', unique: true })
  commodityId: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('enum', {
    name: 'category',
    enum: AppearanceType,
  })
  category: AppearanceType;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('enum', {
    name: 'price_currency',
    enum: CurrencyType,
  })
  priceCurrency: CurrencyType;

  @Column('numeric', { name: 'price_value' })
  priceValue: string;

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
    () => Commodities,
    (commodities) => commodities.appearanceCommodities,
  )
  @JoinColumn([{ name: 'commodity_id', referencedColumnName: 'id' }])
  commodity: Commodities;
}
