import {StatFormulaType, StatType} from "../interpreter/constants"
import {useChampionSpec} from "@/core/hooks/useChampionSpec";
import {ChampionSpec} from "@/core/model/champion";

export const calculateChampionSpec = (championName: string, level: number) => {
    const specBone: ChampionSpec | null = useChampionSpec(championName)
    if (specBone == null) {
        return null
    }

    return calculateChampionSpecWithBoneData(specBone, level)
}

export const calculateChampionSpecWithBoneData = (specBone: any, level: number) => {
    const result: any = {}
    result[StatType.AbilityPower] = {}
    result[StatType.AbilityPower][StatFormulaType.Base] = 0
    result[StatType.AbilityPower][StatFormulaType.Bonus] = 0
    result[StatType.AbilityPower][StatFormulaType.Total] = result[StatType.AbilityPower][StatFormulaType.Base] + result[StatType.AbilityPower][StatFormulaType.Bonus]

    result[StatType.Armor] = {}
    result[StatType.Armor][StatFormulaType.Base] = specBone.armor + specBone.armorPerLevel * (level - 1)
    result[StatType.Armor][StatFormulaType.Bonus] = 0
    result[StatType.Armor][StatFormulaType.Total] = result[StatType.Armor][StatFormulaType.Base] + result[StatType.Armor][StatFormulaType.Bonus]

    result[StatType.Attack] = {}
    result[StatType.Attack][StatFormulaType.Base] = specBone.attackDamage + specBone.attackDamagePerLevel * (level - 1)
    result[StatType.Attack][StatFormulaType.Bonus] = 0
    result[StatType.Attack][StatFormulaType.Base] = result[StatType.Attack][StatFormulaType.Base] + result[StatType.Attack][StatFormulaType.Bonus]

    result[StatType.AttackSpeed] = {}
    result[StatType.AttackSpeed][StatFormulaType.Base] = specBone.attackSpeed + specBone.attackSpeedPerLevel * (level - 1)
    result[StatType.AttackSpeed][StatFormulaType.Bonus] = 0
    result[StatType.AttackSpeed][StatFormulaType.Total] = result[StatType.AttackSpeed][StatFormulaType.Base] + result[StatType.AttackSpeed][StatFormulaType.Bonus]

    result[StatType.AttackWindupTime] = {}
    result[StatType.AttackWindupTime][StatFormulaType.Base] = 0
    result[StatType.AttackWindupTime][StatFormulaType.Bonus] = 0
    result[StatType.AttackWindupTime][StatFormulaType.Total] = 0

    result[StatType.MagicResist] = {}
    result[StatType.MagicResist][StatFormulaType.Base] = specBone.spellBlock + specBone.spellBlockPerLevel * (level - 1)
    result[StatType.MagicResist][StatFormulaType.Bonus] = 0
    result[StatType.MagicResist][StatFormulaType.Total] = result[StatType.MagicResist][StatFormulaType.Base] + result[StatType.MagicResist][StatFormulaType.Bonus]

    result[StatType.MoveSpeed] = {}
    result[StatType.MoveSpeed][StatFormulaType.Base] = specBone.moveSpeed
    result[StatType.MoveSpeed][StatFormulaType.Bonus] = 0
    result[StatType.MoveSpeed][StatFormulaType.Total] = result[StatType.MoveSpeed][StatFormulaType.Base] + result[StatType.MoveSpeed][StatFormulaType.Bonus]

    result[StatType.CritChance] = {}
    result[StatType.CritChance][StatFormulaType.Base] = specBone.crit + specBone.critPerLevel * (level - 1)
    result[StatType.CritChance][StatFormulaType.Bonus] = 0
    result[StatType.CritChance][StatFormulaType.Total] = result[StatType.CritChance][StatFormulaType.Base] + result[StatType.CritChance][StatFormulaType.Bonus]

    result[StatType.CritDamage] = {}
    result[StatType.CritDamage][StatFormulaType.Base] = 0
    result[StatType.CritDamage][StatFormulaType.Bonus] = 0
    result[StatType.CritDamage][StatFormulaType.Base] = 0

    result[StatType.CooldownReduction] = {}
    result[StatType.CooldownReduction][StatFormulaType.Base] = 0
    result[StatType.CooldownReduction][StatFormulaType.Bonus] = 0
    result[StatType.CooldownReduction][StatFormulaType.Total] = 0

    result[StatType.AbilityHaste] = {}
    result[StatType.AbilityHaste][StatFormulaType.Base] = 0
    result[StatType.AbilityHaste][StatFormulaType.Bonus] = 0
    result[StatType.AbilityHaste][StatFormulaType.Base] = 0

    result[StatType.MaxHealth] = {}
    result[StatType.MaxHealth][StatFormulaType.Base] = specBone.hp + specBone.hpPerLevel * (level - 1)
    result[StatType.MaxHealth][StatFormulaType.Bonus] = 0
    result[StatType.MaxHealth][StatFormulaType.Total] = result[StatType.MaxHealth][StatFormulaType.Base] + result[StatType.MaxHealth][StatFormulaType.Bonus]

    result[StatType.CurrentHealth] = specBone.hp + specBone.hpPerLevel * (level - 1)

    result[StatType.PercentMissingHealth] = 0
    result[StatType.LifeSteal] = 0
    result[StatType.OmniVamp] = 0
    result[StatType.PhysicalVamp] = 0
    result[StatType.MagicPenetrationFlat] = 0
    result[StatType.MagicPenetrationPercent] = 0
    result[StatType.BonusMagicPenetrationPercent] = 0
    result[StatType.MagicLethality] = 0
    result[StatType.ArmorPenetrationFlat] = 0
    result[StatType.ArmorPenetrationPercent] = 0
    result[StatType.BonusArmorPenetrationPercent] = 0
    result[StatType.PhysicalLethality] = 0
    result[StatType.Tenacity] = 0
    result[StatType.AttackRange] = 0
    result[StatType.HealthRegenRate] = 0
    result[StatType.ResourceRegenRate] = 0
    result[StatType.DodgeChance] = 0

    return result
}