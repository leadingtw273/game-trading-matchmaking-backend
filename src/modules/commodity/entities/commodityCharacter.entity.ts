import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Commodities } from './commodity.entity';
import { CharacterArenaScores } from './commodityCharacterArenaScores.entity';
import { CharacterGearScores } from './commodityCharacterGear.entity';
import { CharacterSkinCounts } from './commodityCharacterSkinCounts.entity';
import {
  BodyType,
  CampType,
  CurrencyType,
  InnerSkillType,
  SectType,
} from '@/common/enums';

@Index(
  'idx_character_commodities',
  [
    'accomplishmentScore',
    'bodyTypeList',
    'campList',
    'id',
    'innerSkillList',
    'priceCurrency',
    'priceValue',
    'sectList',
  ],
  {},
)
@Index('uq_character_commodities_commodity_id', ['commodityId'], {
  unique: true,
})
@Index('pk_character_commodities', ['id'], { unique: true })
@Entity('character_commodities', { schema: 'public' })
export class CharacterCommodities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'commodity_id', unique: true })
  commodityId: number;

  @Column('enum', {
    name: 'sect_list',
    enum: SectType,
    array: true,
  })
  sectList: SectType[];

  @Column('enum', {
    name: 'inner_skill_list',
    enum: InnerSkillType,
    array: true,
  })
  innerSkillList: InnerSkillType[];

  @Column('enum', {
    name: 'body_type_list',
    enum: BodyType,
    array: true,
  })
  bodyTypeList: BodyType[];

  @Column('enum', {
    name: 'camp_list',
    enum: CampType,
    array: true,
  })
  campList: CampType[];

  @Column('integer', { name: 'level' })
  level: number;

  @Column('boolean', { name: 'info_no_debt' })
  infoNoDebt: boolean;

  @Column('boolean', { name: 'info_need_change_name' })
  infoNeedChangeName: boolean;

  @Column('boolean', { name: 'info_need_transferred' })
  infoNeedTransferred: boolean;

  @Column('boolean', { name: 'info_need_full_level' })
  infoNeedFullLevel: boolean;

  @Column('enum', {
    name: 'price_currency',
    enum: CurrencyType,
  })
  priceCurrency: CurrencyType;

  @Column('integer', { name: 'price_value' })
  priceValue: number;

  @Column('varchar', { name: 'image_list', nullable: true, array: true })
  imageList: string[] | null;

  @Column('integer', { name: 'battle_rank_score', nullable: true })
  battleRankScore: number | null;

  @Column('integer', { name: 'estate_rank_score', nullable: true })
  estateRankScore: number | null;

  @Column('integer', { name: 'endless_battle_value_energy', nullable: true })
  endlessBattleValueEnergy: number | null;

  @Column('integer', { name: 'endless_battle_value_stamina', nullable: true })
  endlessBattleValueStamina: number | null;

  @Column('integer', { name: 'accomplishment_score', nullable: true })
  accomplishmentScore: number | null;

  @Column('integer', { name: 'pet_score', nullable: true })
  petScore: number | null;

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
    (commodities) => commodities.characterCommodities,
  )
  @JoinColumn([{ name: 'commodity_id', referencedColumnName: 'id' }])
  commodity: Commodities;

  @OneToMany(
    () => CharacterArenaScores,
    (characterArenaScores) => characterArenaScores.characterCommodity,
  )
  characterArenaScores: CharacterArenaScores[];

  @OneToMany(
    () => CharacterGearScores,
    (characterGearScores) => characterGearScores.characterCommodity,
  )
  characterGearScores: CharacterGearScores[];

  @OneToMany(
    () => CharacterSkinCounts,
    (characterSkinCounts) => characterSkinCounts.characterCommodity,
  )
  characterSkinCounts: CharacterSkinCounts[];
}
