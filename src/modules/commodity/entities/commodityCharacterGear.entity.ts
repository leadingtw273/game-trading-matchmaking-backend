import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterCommodities } from './commodityCharacter.entity';
import { GearType, InnerSkillType } from '@/common/enums';

@Index(
  'uq_character_gear_scores_character_commodity_id_inner_skill',
  ['characterCommodityId', 'innerSkill', 'type'],
  { unique: true },
)
@Index('pk_character_gear_scores', ['id'], { unique: true })
@Entity('character_gear_scores', { schema: 'public' })
export class CharacterGearScores {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'character_commodity_id' })
  characterCommodityId: number;

  @Column('enum', {
    name: 'inner_skill',
    nullable: true,
    enum: InnerSkillType,
  })
  innerSkill: InnerSkillType | null;

  @Column('enum', { name: 'type', enum: GearType })
  type: GearType;

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
    (characterCommodities) => characterCommodities.characterGearScores,
  )
  @JoinColumn([{ name: 'character_commodity_id', referencedColumnName: 'id' }])
  characterCommodity: CharacterCommodities;
}
