import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {PartFromJson} from "@/core/interpreter/part/utils";

export class ProductOfSubPartsCalculationPart extends CalculationPart {
    public part1: CalculationPart | null = null
    public part2: CalculationPart | null = null

    override GetValue(ctx: SkillCalculationContext): number {
        if (this.part1 == null || this.part2 == null) {
            return 0
        }

        return this.part1.GetValue(ctx) + this.part2.GetValue(ctx)
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const mPart1 = json.mPart1
        if (mPart1 != null) {
            this.part1 = PartFromJson(mPart1, ctx)
        }

        const mPart2 = json.mPart2
        if (mPart2 != null) {
            this.part2 = PartFromJson(mPart2, ctx)
        }
    }

    override GetType(): number {
        return 0;
    }
}