import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {DataValue} from "@/core/model/skill";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {getBinHash} from "@/core/interpreter/interpreter";
import {StatFormulaType, StatType} from "@/core/interpreter/constants";

export class StatByNamedDataValueCalculationPart extends CalculationPart {
    public stat: StatType = 0
    public statFormula: StatFormulaType = 0
    public dataValue: DataValue | null = null

    override GetValue(ctx: SkillCalculationContext): number {
        if (this.dataValue == null) {
            return 0
        }

        return this.dataValue.values[ctx.spellRank]
    }

    override String(ctx: SkillCalculationContext): string {
        if (this.dataValue == null || this.dataValue.values == null) {
            return '?'
        }

        return `${Math.round(this.dataValue.values[ctx.spellRank] * 100).toFixed(0)}% ${this.stat}`
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const mStat = json.mStat
        if (mStat != null) {
            this.stat = mStat
        }

        const mStatFormula = json.mStatFormula
        if (mStatFormula != null) {
            this.statFormula = mStatFormula
        }

        const name = json.mDataValue
        ctx.dataValues.forEach((value, key) => {
            if (key == name || getBinHash(key) == name) {
                this.dataValue = value
            }
        })
    }

    override GetType(): number {
        return 0;
    }
}