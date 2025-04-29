import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PosterContacts } from './posterContact.entity';
import { Transactions } from '@/modules/transaction/entities/transaction.entity';

@Index('uq_posters', ['gameId', 'nickname'], { unique: true })
@Index('pk_posters', ['id'], { unique: true })
@Entity('posters', { schema: 'public' })
export class Posters {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'nickname' })
  nickname: string;

  @Column('character varying', { name: 'avatar_url', nullable: true })
  avatarUrl: string | null;

  @Column('character varying', { name: 'game_id' })
  gameId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'now() ',
  })
  updatedAt: Date | null;

  @OneToMany(() => PosterContacts, (posterContacts) => posterContacts.poster)
  posterContacts: PosterContacts[];

  @OneToMany(() => Transactions, (transactions) => transactions.poster)
  transactions: Transactions[];
}
