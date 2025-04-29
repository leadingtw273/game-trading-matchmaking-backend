import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterCommodities } from './commodityCharacter.entity';
import { ArenaType } from '@/common/enums';

@Index(
  'uq_character_arena_scores_character_commodity_id_type',
  ['characterCommodityId', 'type'],
  { unique: true },
)
@Index('pk_character_arena_scores', ['id'], { unique: true })
@Entity('character_arena_scores', { schema: 'public' })
export class CharacterArenaScores {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'character_commodity_id' })
  characterCommodityId: number;

  @Column('enum', {
    name: 'type',
    enum: ArenaType,
  })
  type: ArenaType;

  @Column('integer', { name: 'score', nullable: true })
  score: number | null;

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
    (characterCommodities) => characterCommodities.characterArenaScores,
  )
  @JoinColumn([{ name: 'character_commodity_id', referencedColumnName: 'id' }])
  characterCommodity: CharacterCommodities;
}
