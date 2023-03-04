export enum StatType {
    AbilityPower = 0,
    Armor = 1,
    Attack = 2,
    AttackSpeed = 3,
    AttackWindupTime = 4,
    MagicResist = 5,
    MoveSpeed = 6,
    CritChance = 7,
    CritDamage = 8,
    CooldownReduction= 9,
    AbilityHaste = 10,
    MaxHealth = 11,
    CurrentHealth= 12,
    PercentMissingHealth = 13,
    Unknown14 = 14,
    LifeSteal = 15,
    OmniVamp = 17,
    PhysicalVamp = 18,
    MagicPenetrationFlat = 19,
    MagicPenetrationPercent = 20,
    BonusMagicPenetrationPercent = 21,
    MagicLethality = 22,
    ArmorPenetrationFlat = 23,
    ArmorPenetrationPercent = 24,
    BonusArmorPenetrationPercent = 25,
    PhysicalLethality = 26,
    Tenacity = 27,
    AttackRange = 28,
    HealthRegenRate = 29,
    ResourceRegenRate = 30,
    Unknown31 = 31,
    Unknown32 = 32,
    DodgeChance = 33,

    HpPerLevel = 34,
    HpRegenPerLevel = 35,
    ArmorPerLevel = 36,
    SpellBlockPerLevel = 37,
    DamagePerLevel = 38,

}

export enum StatFormulaType {
    Base = 0,
    Total = 1,
    Bonus = 2,
    Unknown3 = 3,
    Unknown4 = 4
}

export enum AbilityResourceType {
    Mana = 0,
}

export enum DamageType {
    Physical = 0,
    Magic = 1,
    True = 2
}

export const HardCC: string[] = ['Knock', 'Charm', 'Fear', 'Taunt', 'Sleep', 'Stun', 'Suppress',
    '기절', '매혹', '공포', '수면', '공중', '제압', '도발']
export const PartialCC: string[] = ['Blind', 'Cripple', 'Disarm', 'Drowsy', 'Ground', 'Pull',
    'Nearsight', 'Polymorph', 'Root', 'Silence', 'Slow',
    '실명', '둔화', '무장 해제', '졸음', '고정', '끌어 당김', '시야 차단', '변이', '속박', '침묵', '느려짐']