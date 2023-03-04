import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {StatFormulaType, StatType} from "@/core/interpreter/constants";
import {PartFromJson} from "@/core/interpreter/part/utils";

export class SubPartScaledProportionalToStat  extends CalculationPart {
    public stat: StatType = 0
    public statFormula: StatFormulaType = 0
    public subPart: CalculationPart | null = null
    public ratio: number = 0

    override GetValue(ctx: SkillCalculationContext): number {
        if (this.subPart == null) {
            return 0
        }
        const subPartVal = this.subPart.GetValue(ctx)
        return (((ctx.stats.values.get(this.stat) || 0) * this.ratio) + 1) * subPartVal
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
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

        const subPart = json.mSubPart
        if (subPart != null) {
            this.subPart = PartFromJson(subPart, ctx)
        }

        const ratio = json.mRatio
        if (ratio != null) {
            this.ratio = ratio
        }
    }

    override GetType(): number {
        return 0;
    }
}