import {AbilityResourceType, StatType} from "@/core/interpreter/constants";
import {DataValue, Spell} from "@/core/model/skill";

export type OptionalChampion = Champion | null

export interface Champion {
  key: string
  id: string
  name: string
  image: {
    full: string
    sprite: string
  }
  stats: {
    hp: string
    hpPerLevel: string
    mp: string
    mpPerLevel: string
    moveSpeed: string
    armor: string
    armorPerLevel: string
    spellBlock: string
    spellBlockPerLevel: string
    attackRange: string
    hpRegen: string
    hpRegenPerLevel: string
    mpRegen: string
    mpRegenPerLevel: string
    crit: string
    critPerLevel: string
    attackDamage: string
    attackDamagePerLevel: string
    attackSpeedPerLevel: string
    attackSpeed: string
  }
}

export type ChampionSpec = {
  armor: number
  armorPerLevel: number
  attackDamage: number
  attackDamagePerLevel: number
  attackRange: number
  attackSpeed: number
  attackSpeedPerLevel: number
  crit: number
  critPerLevel: number
  hp: number
  hpPerLevel: number
  hpRegen: number
  hpRegenPerLevel: number
  moveSpeed: number
  mp: number
  mpPerLevel: number
  mpRegen: number
  mpRegenPerLevel: number
  spellBlock: number
  spellBlockPerLevel: number
}

// TODO; use it as real champion class
export interface Champion2 {
  name: string
  tags: string[]
  baseStat: Stats
  abilityResource: AbilityResourceType
  spells: Spell[]
}

export class ChampionWrapper {
  public champion: Champion2 | null = null
  public stats: Stats | null = null
  public level: number = 0
  public items: any[] = []
  public buffs: any[] = []

  public getCurrentStat() {
    if (this.champion == null || this.champion.baseStat == null || this.champion.baseStat.values == null) {
      return null
    }

    const baseStat = this.champion.baseStat.values
    const newStat = new Map<StatType, number>()
    // TODO : calculate including items
    newStat.set(StatType.AbilityPower, 0)
    newStat.set(StatType.Armor, (baseStat.get(StatType.Armor) || 0) + (baseStat.get(StatType.ArmorPerLevel) || 0) * (this.level - 1))
    newStat.set(StatType.Attack, (baseStat.get(StatType.Attack) || 0) + (baseStat.get(StatType.DamagePerLevel) || 0) * (this.level - 1))
    newStat.set(StatType.AttackSpeed, baseStat.get(StatType.AttackSpeed) || 0)
    newStat.set(StatType.AttackWindupTime, baseStat.get(StatType.AttackSpeed) || 0)
    newStat.set(StatType.MagicResist, (baseStat.get(StatType.MagicResist) || 0) + (baseStat.get(StatType.SpellBlockPerLevel) || 0) * (this.level - 1))
    newStat.set(StatType.MoveSpeed, baseStat.get(StatType.MoveSpeed) || 0)
    newStat.set(StatType.CritChance, baseStat.get(StatType.CritChance) || 0)
    newStat.set(StatType.CritDamage, baseStat.get(StatType.CritDamage) || 0)
    newStat.set(StatType.CooldownReduction, baseStat.get(StatType.CooldownReduction) || 0)
    newStat.set(StatType.AbilityHaste, baseStat.get(StatType.AbilityHaste) || 0)
    newStat.set(StatType.MaxHealth, (baseStat.get(StatType.MaxHealth) || 0) + (baseStat.get(StatType.HpPerLevel) || 0) * (this.level - 1))
    newStat.set(StatType.CurrentHealth, (baseStat.get(StatType.MaxHealth) || 0) + (baseStat.get(StatType.HpPerLevel) || 0) * (this.level - 1))
    newStat.set(StatType.PercentMissingHealth, 0)
    newStat.set(StatType.LifeSteal, 0)
    newStat.set(StatType.OmniVamp, 0)
    newStat.set(StatType.PhysicalVamp, 0)
    newStat.set(StatType.MagicPenetrationFlat, 0)
    newStat.set(StatType.MagicPenetrationPercent, 0)
    newStat.set(StatType.BonusMagicPenetrationPercent, 0)
    newStat.set(StatType.MagicLethality, 0)
    newStat.set(StatType.ArmorPenetrationFlat, 0)
    newStat.set(StatType.ArmorPenetrationPercent, 0)
    newStat.set(StatType.BonusArmorPenetrationPercent, 0)
    newStat.set(StatType.PhysicalLethality, 0)
    newStat.set(StatType.Tenacity, 0)
    newStat.set(StatType.AttackRange, 0)
    newStat.set(StatType.HealthRegenRate, (baseStat.get(StatType.HealthRegenRate) || 0) + (baseStat.get(StatType.HpRegenPerLevel) || 0) * (this.level - 1))
    newStat.set(StatType.ResourceRegenRate, 0)
    newStat.set(StatType.DodgeChance, 0)
    newStat.set(StatType.HpPerLevel, baseStat.get(StatType.HpPerLevel) || 0)
    newStat.set(StatType.HpRegenPerLevel, baseStat.get(StatType.HpRegenPerLevel) || 0)
    newStat.set(StatType.ArmorPerLevel, baseStat.get(StatType.ArmorPerLevel) || 0)
    newStat.set(StatType.SpellBlockPerLevel, baseStat.get(StatType.SpellBlockPerLevel) || 0)
    newStat.set(StatType.DamagePerLevel, baseStat.get(StatType.DamagePerLevel) || 0)

    return {
      abilityResource: {

      },
      values: newStat
    }
  }
  getMaxHP() {
    if (this.champion == null) {
      return 0
    }

    return (this.champion.baseStat.values.get(StatType.MaxHealth) || 0) +
        (this.champion.baseStat.values.get(StatType.HpPerLevel) || 0)  * (this.level - 1)
  }

  getHpRegen() {
    if (this.champion == null) {
      return 0
    }

    return (this.champion.baseStat.values.get(StatType.HpRegenPerLevel) || 0) * (this.level - 1)
  }

  getResource() {
    if (this.champion == null) {
      return 0
    }

    return 0
  }

  getDamage() {
    if (this.champion == null) {
      return 0
    }

    return (this.champion.baseStat.values.get(StatType.Attack) || 0) +
        (this.champion.baseStat.values.get(StatType.DamagePerLevel) || 0) * (this.level - 1)
  }

  getAbility() {
    if (this.champion == null) {
      return 0
    }

    return 0
  }

  getArmor() {
    if (this.champion == null) {
      return 0
    }
  }

  getSpellBlock() {

  }
}

export interface ChampionStats {
  name: string
  tags: string[]
  baseStats: Stats
  stats: Stats
  spells: Spell[]
  abilityResource: AbilityResourceType
  item: any[]
  level: number
  buffs: any[]
  skillLevels: number[]
}

export interface SkillCalculationContext {
  championLevel: number
  stats: Stats
  dataValues: Map<string, DataValue>
  effectValues: number[][]
  spell: Spell
  spellRank: number
  multiplier: number
}

export interface ParsingContext {
  apiSpell: any
  dataValues: Map<string, DataValue>
}

export interface Stats {
  abilityResource: AbilityResource
  values: Map<StatType, number>
}

export const StatFromData = (data: any) => {
  if (data == null) {
    return null
  }

  const value = new Map<StatType, number>()
  value.set(StatType.AbilityPower, 0)
  value.set(StatType.Armor, data.baseArmor)
  value.set(StatType.Attack, data.baseDamage)
  value.set(StatType.AttackSpeed, data.attackSpeed)
  value.set(StatType.AttackWindupTime, 0)
  value.set(StatType.MagicResist, data.baseSpellBlock)
  value.set(StatType.MoveSpeed, data.baseMoveSpeed)
  value.set(StatType.CritChance, 0)
  value.set(StatType.CritDamage, 0)
  value.set(StatType.CooldownReduction, 0)
  value.set(StatType.AbilityHaste, 0)
  value.set(StatType.MaxHealth, data.baseHP)
  value.set(StatType.CurrentHealth, data.baseHP)
  value.set(StatType.PercentMissingHealth, 0)
  value.set(StatType.LifeSteal, 0)
  value.set(StatType.OmniVamp, 0)
  value.set(StatType.PhysicalVamp, 0)
  value.set(StatType.MagicPenetrationFlat, 0)
  value.set(StatType.MagicPenetrationPercent, 0)
  value.set(StatType.BonusMagicPenetrationPercent, 0)
  value.set(StatType.MagicLethality, 0)
  value.set(StatType.ArmorPenetrationFlat, 0)
  value.set(StatType.ArmorPenetrationPercent, 0)
  value.set(StatType.BonusArmorPenetrationPercent, 0)
  value.set(StatType.PhysicalLethality, 0)
  value.set(StatType.Tenacity, 0)
  value.set(StatType.AttackRange, data.attackRange)
  value.set(StatType.HealthRegenRate, data.baseStaticHPRegen)
  value.set(StatType.ResourceRegenRate, 0)
  value.set(StatType.DodgeChance, 0)
  value.set(StatType.HpPerLevel, data.hpPerLevel)
  value.set(StatType.HpRegenPerLevel, data.hpRegenPerLevel)
  value.set(StatType.ArmorPerLevel, data.armorPerLevel)
  value.set(StatType.SpellBlockPerLevel, data.spellBlockPerLevel)
  value.set(StatType.DamagePerLevel, data.damagePerLevel)

  return {
    abilityResource: {
      type: 0,
      value: 0
    },
    values: value
  } as Stats
}

export interface AbilityResource {
  type: AbilityResourceType
  value: number
}

