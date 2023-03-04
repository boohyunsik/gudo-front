import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {StatFormulaType, StatType} from "@/core/interpreter/constants";

export class StatByCoefficientCalculationPart extends CalculationPart {
    public stat: StatType = 0
    public statFormula: StatFormulaType = 0
    public coefficient: number = 0

    override GetValue(ctx: SkillCalculationContext): number {
        return this.coefficient
    }

    override String(ctx: SkillCalculationContext): string {
        return `${Math.round(this.coefficient * 100).toFixed(0)}% ${this.stat}`
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

        this.coefficient = json.mCoefficient
    }

    override GetType(): number {
        return 0;
    }
}