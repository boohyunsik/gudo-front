import {ParsingContext} from "@/core/model/champion";
import {EffectValueCalculationPart} from "@/core/interpreter/part/effectValueCalculationPart";
import {NamedDataValueCalculationPart} from "@/core/interpreter/part/namedDatavalueCalculationPart";
import {
    CustomReductionMultiplierCalculationPart
} from "@/core/interpreter/part/customReductionMultiplierCalculationPart";
import {ProductOfSubPartsCalculationPart} from "@/core/interpreter/part/productOfSubPartsCalculationPart";
import {SumOfSubPartsCalculationPart} from "@/core/interpreter/part/sumOfSubPartsCalculationPart";
import {NumberCalculationPart} from "@/core/interpreter/part/numberCalculationPart";
import {StatByCoefficientCalculationPart} from "@/core/interpreter/part/statByCoefficientCalculationPart";
import {StatBySubPartCalculationPart} from "@/core/interpreter/part/statBySubPartCalculationPart";
import {StatByNamedDataValueCalculationPart} from "@/core/interpreter/part/statByNamedDataValueCalculationPart";
import {SubPartScaledProportionalToStat} from "@/core/interpreter/part/subPartScaledProportionalToStat";
import {
    AbilityResourceByCoefficientCalculationPart
} from "@/core/interpreter/part/abilityResourceByCoefficientCalculationPart";
import {BuffCounterByCoefficientCalculationPart} from "@/core/interpreter/part/buffCounterByCoefficientCalculationPart";
import {
    BuffCounterByNamedDataValueCalculationPart
} from "@/core/interpreter/part/buffCounterByNamedDataValueCalculationPart";
import {ByCharLevelInterpolationCalculationPart} from "@/core/interpreter/part/byCharLevelInterpolationCalculationPart";
import {ByCharLevelBreakPointsCalculationPart} from "@/core/interpreter/part/byCharLevelBreakPointsCalculationPart";
import {ByCharLevelFormulaCalculationPart} from "@/core/interpreter/part/byCharLevelFormulaCalculationPart";
import {CooldownMultiplierCalculationPart} from "@/core/interpreter/part/cooldownMultiplierCalculationPart";
import {CalculationPart, CalculationPartType} from "@/core/interpreter/part/calculationPart";

export const FormulaPartTypeFromString = (s: string) => {
    switch (s) {
        case "IGameCalculationPart":
            return CalculationPartType.IGameCalculationPartType
        case "EffectValueCalculationPart":
            return CalculationPartType.EffectValueCalculationPart
        case "NamedDataValueCalculationPart":
            return CalculationPartType.NamedDataValueCalculationPart
        case "CustomReductionMultiplierCalculationPart":
            return CalculationPartType.CustomReductionMultiplierCalculationPart
        case "ProductOfSubPartsCalculationPart":
            return CalculationPartType.ProductOfSubPartsCalculationPart
        case "SumOfSubPartsCalculationPart":
            return CalculationPartType.SumOfSubPartsCalculationPart
        case "NumberCalculationPart":
            return CalculationPartType.NumberCalculationPart
        case "IGameCalculationPartWithStats":
            return CalculationPartType.IGameCalculationPartWithStats
        case "StatByCoefficientCalculationPart":
            return CalculationPartType.StatByCoefficientCalculationPart
        case "StatBySubPartCalculationPart":
            return CalculationPartType.StatBySubPartCalculationPart
        case "StatByNamedDataValueCalculationPart":
            return CalculationPartType.StatByNamedDataValueCalculationPart
        case "SubPartScaledProportionalToStat":
            return CalculationPartType.SubPartScaledProportionalToStat
        case "AbilityResourceByCoefficientCalculationPart":
            return CalculationPartType.AbilityResourceByCoefficientCalculationPart
        case "IGameCalculationPartWithBuffCounter":
            return CalculationPartType.IGameCalculationPartWithBuffCounter
        case "BuffCounterByCoefficientCalculationPart":
            return CalculationPartType.BuffCounterByCoefficientCalculationPart
        case "BuffCounterByNamedDataValueCalculationPart":
            return CalculationPartType.BuffCounterByNamedDataValueCalculationPart
        case "IGameCalculationPartByCharLevel":
            return CalculationPartType.IGameCalculationPartByCharLevel
        case "ByCharLevelInterpolationCalculationPart":
            return CalculationPartType.ByCharLevelInterpolationCalculationPart
        case "ByCharLevelBreakpointsCalculationPart":
            return CalculationPartType.ByCharLevelBreakpointsCalculationPart
        case "Breakpoint":
            return CalculationPartType.Breakpoint
        case "ByCharLevelFormulaCalculationPart":
            return CalculationPartType.ByCharLevelFormulaCalculationPart
        case "CooldownMultiplierCalculationPart":
            return CalculationPartType.CooldownMultiplierCalculationPart
        default:
            return CalculationPartType.UnknownPart
    }
}

export const PartFromJson = (json: any, ctx: ParsingContext) => {
    // console.log('PartFromJson', json)
    const t = FormulaPartTypeFromString(json['__type'])
    let p: CalculationPart | null
    switch (t) {
        case CalculationPartType.UnknownPart:
            return null
        case CalculationPartType.EffectValueCalculationPart:
            p = new EffectValueCalculationPart()
            break
        case CalculationPartType.NamedDataValueCalculationPart:
            p = new NamedDataValueCalculationPart()
            break
        case CalculationPartType.CustomReductionMultiplierCalculationPart:
            p = new CustomReductionMultiplierCalculationPart()
            break
        case CalculationPartType.ProductOfSubPartsCalculationPart:
            p = new ProductOfSubPartsCalculationPart()
            break
        case CalculationPartType.SumOfSubPartsCalculationPart:
            p = new SumOfSubPartsCalculationPart()
            break
        case CalculationPartType.NumberCalculationPart:
            p = new NumberCalculationPart()
            break
        case CalculationPartType.StatByCoefficientCalculationPart:
            p = new StatByCoefficientCalculationPart()
            break
        case CalculationPartType.StatBySubPartCalculationPart:
            p = new StatBySubPartCalculationPart()
            break
        case CalculationPartType.StatByNamedDataValueCalculationPart:
            p = new StatByNamedDataValueCalculationPart()
            break
        case CalculationPartType.SubPartScaledProportionalToStat:
            p = new SubPartScaledProportionalToStat()
            break
        case CalculationPartType.AbilityResourceByCoefficientCalculationPart:
            p = new AbilityResourceByCoefficientCalculationPart()
            break
        case CalculationPartType.BuffCounterByCoefficientCalculationPart:
            p = new BuffCounterByCoefficientCalculationPart()
            break
        case CalculationPartType.BuffCounterByNamedDataValueCalculationPart:
            p = new BuffCounterByNamedDataValueCalculationPart()
            break
        case CalculationPartType.ByCharLevelInterpolationCalculationPart:
            p = new ByCharLevelInterpolationCalculationPart()
            break
        case CalculationPartType.ByCharLevelBreakpointsCalculationPart:
            p = new ByCharLevelBreakPointsCalculationPart()
            break
        case CalculationPartType.ByCharLevelFormulaCalculationPart:
            p = new ByCharLevelFormulaCalculationPart()
            break
        case CalculationPartType.CooldownMultiplierCalculationPart:
            p = new CooldownMultiplierCalculationPart()
            break
        default:
            p = null
    }

    p?.FromJson(json, ctx)
    return p
}