import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commodities } from '@/modules/commodity/entities/commodity.entity';
import { Posters } from '@/modules/poster/entities/poster.entity';
import {
  TransactionMethodType,
  TransactionStatusType,
  TransactionType,
} from '@/common/enums';

@Index(
  'idx_transactions',
  ['commodityId', 'createdAt', 'posterId', 'status', 'type', 'updatedAt'],
  {},
)
@Index('idx_transactions_methods', ['methods'], {})
@Index('idx_transactions_token', ['token'], {})
@Index('uq_transactions_order_id', ['orderId'], { unique: true })
@Index('uq_transactions_token', ['token'], { unique: true })
@Index('pk_transactions', ['id'], { unique: true })
@Entity('transactions', { schema: 'public' })
export class Transactions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'order_id',
    nullable: true,
    unique: true,
    length: 20,
  })
  orderId: string | null;

  @Column('uuid', {
    name: 'token',
    unique: true,
    default: () => 'uuid_generate_v4()',
  })
  token: string;

  @Column('enum', { name: 'type', enum: TransactionType })
  type: TransactionType;

  @Column('enum', {
    name: 'status',
    enum: TransactionStatusType,
  })
  status: TransactionStatusType;

  @Column('enum', {
    name: 'methods',
    enum: TransactionMethodType,
    array: true,
  })
  methods: TransactionMethodType[];

  @Column('integer', { name: 'commodity_id' })
  commodityId: number;

  @Column('integer', { name: 'poster_id' })
  posterId: number;

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

  @ManyToOne(() => Commodities, (commodities) => commodities.transactions)
  @JoinColumn([{ name: 'commodity_id', referencedColumnName: 'id' }])
  commodity: Commodities;

  @ManyToOne(() => Posters, (posters) => posters.transactions)
  @JoinColumn([{ name: 'poster_id', referencedColumnName: 'id' }])
  poster: Posters;
}
