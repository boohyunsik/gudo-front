import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export interface Skill {
    id: string
    description: string
    name: string
    cost: number[]
    costBurn: string
    costType: string
    image: {
        full: string
        group: string
        h: number
        w: number
        sprite: string
    }
    tooltip: string
}

export type DamageType = number

export interface DataValue {
    values: number[]
    baseValue: number
    formula: string
}

export interface Spell {
    name: string
    tooltip: string
    damageType: DamageType[]
    tags: string[]
    effectAmounts: number[][]
    dataValues: Map<string, DataValue>
    spellCalculations: any[]
    coefficient: number
    castTime: number
    coolDownTime: number[]
    delayCaseOffsetPercent: number
    delayTotalTimePercent: number
    castRange: number[]
    castRadius: number[]
    CC: string[]
    partialCC: string[]
}

export const spellFromData = (data: any, fontConfig: any) => {
}

export interface GameCalculation {
    name: string
    formulaParts: any
    displayAsPercent: boolean
    precision: number
    multiplier: any
}