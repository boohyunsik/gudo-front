import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export abstract class CalculationPart {
    public abstract GetValue(ctx: SkillCalculationContext): number
    public abstract String(ctx: SkillCalculationContext): string
    public abstract FromJson(json: any, ctx: ParsingContext): any
    public abstract GetType(): number
}

export enum CalculationPartType {
    UnknownPart = 0,
    IGameCalculationPartType = 1,
    EffectValueCalculationPart = 2,
    NamedDataValueCalculationPart = 3,
    CustomReductionMultiplierCalculationPart = 4,
    ProductOfSubPartsCalculationPart = 5,
    SumOfSubPartsCalculationPart = 6,
    NumberCalculationPart = 7,
    IGameCalculationPartWithStats = 8,
    StatByCoefficientCalculationPart = 9,
    StatBySubPartCalculationPart = 10,
    StatByNamedDataValueCalculationPart = 11,
    SubPartScaledProportionalToStat = 12,
    AbilityResourceByCoefficientCalculationPart = 13,
    IGameCalculationPartWithBuffCounter = 14,
    BuffCounterByCoefficientCalculationPart = 15,
    BuffCounterByNamedDataValueCalculationPart = 16,
    IGameCalculationPartByCharLevel = 17,
    ByCharLevelInterpolationCalculationPart = 18,
    ByCharLevelBreakpointsCalculationPart = 19,
    Breakpoint = 20,
    ByCharLevelFormulaCalculationPart = 21,
    CooldownMultiplierCalculationPart = 22
}

