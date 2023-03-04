import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class NumberCalculationPart extends CalculationPart {
    public number: number = 0

    override GetValue(ctx: SkillCalculationContext): number {
        return this.number
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const data = json.mNumber
        if (data != null) {
            this.number = data
        }
    }

    override GetType(): number {
        return 0;
    }
}