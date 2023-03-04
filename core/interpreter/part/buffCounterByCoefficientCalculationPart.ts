import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class BuffCounterByCoefficientCalculationPart  extends CalculationPart {
    public buffName: string = ''
    public coefficient: number = 0

    override GetValue(ctx: SkillCalculationContext): number {
        return 0
    }

    override String(ctx: SkillCalculationContext): string {
        return `${Math.round(this.coefficient * 100)} ${this.buffName}`
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        if (json.mBuffName != null) {
            this.buffName = json.mBufName
        }

        if (json.mCoefficient != null) {
            this.coefficient = json.mCoefficient
        }
    }

    override GetType(): number {
        return 0;
    }
}