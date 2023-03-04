import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class CooldownMultiplierCalculationPart extends CalculationPart {
    override GetValue(ctx: SkillCalculationContext): number {
        return 0
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
    }

    override GetType(): number {
        return 0;
    }
}