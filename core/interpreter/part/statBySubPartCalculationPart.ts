import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {StatFormulaType, StatType} from "@/core/interpreter/constants";
import {PartFromJson} from "@/core/interpreter/part/utils";

export class StatBySubPartCalculationPart extends CalculationPart {
    public stat: StatType = 0
    public statFormula: StatFormulaType = 0
    public subpart: CalculationPart | null = null

    override GetValue(ctx: SkillCalculationContext): number {
        if (this.subpart == null) {
            return 0
        }

        return this.subpart.GetValue(ctx)
    }

    override String(ctx: SkillCalculationContext): string {
        return `${Math.round(this.subpart?.GetValue(ctx) || 0).toFixed(0)} ${this.stat}`
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
            this.subpart = PartFromJson(json, ctx)
        }
    }

    override GetType(): number {
        return 0;
    }
}