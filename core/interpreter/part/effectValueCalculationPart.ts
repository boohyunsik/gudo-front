import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class EffectValueCalculationPart extends CalculationPart {
    public effectIndex: number = 1

    constructor() {
        super();
    }

    override GetValue(ctx: SkillCalculationContext): number {
        if (ctx.effectValues == null) {
            return 0
        }

        return ctx.effectValues[this.effectIndex - 1][ctx.spellRank]
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        this.effectIndex = json.mEffectIndex
    }

    override GetType(): number {
        return 0;
    }
}