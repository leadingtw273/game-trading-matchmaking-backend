import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterCommodities } from './commodityCharacter.entity';
import { SkinType } from '@/common/enums';

@Index(
  'idx_character_skin_counts_character_commodity_id_type',
  ['characterCommodityId', 'type'],
  { unique: true },
)
@Index('pk_character_skin_counts', ['id'], { unique: true })
@Entity('character_skin_counts', { schema: 'public' })
export class CharacterSkinCounts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'character_commodity_id' })
  characterCommodityId: number;

  @Column('enum', {
    name: 'type',
    enum: SkinType,
  })
  type: SkinType;

  @Column('integer', { name: 'value', nullable: true })
  value: number | null;

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

  @ManyToOne(
    () => CharacterCommodities,
    (characterCommodities) => characterCommodities.characterSkinCounts,
  )
  @JoinColumn([{ name: 'character_commodity_id', referencedColumnName: 'id' }])
  characterCommodity: CharacterCommodities;
}
