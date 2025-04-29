import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posters } from './poster.entity';
import { ContactType } from '@/common/enums';

@Index('uq_poster_contacts', ['posterId', 'type'], { unique: true })
@Index('pk_poster_contacts', ['id'], { unique: true })
@Entity('poster_contacts', { schema: 'public' })
export class PosterContacts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'poster_id' })
  posterId: number;

  @Column('enum', {
    name: 'type',
    enum: ContactType,
  })
  type: ContactType;

  @Column('character varying', { name: 'value' })
  value: string;

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

  @ManyToOne(() => Posters, (posters) => posters.posterContacts)
  @JoinColumn([{ name: 'poster_id', referencedColumnName: 'id' }])
  poster: Posters;
}
