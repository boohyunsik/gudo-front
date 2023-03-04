import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {PartFromJson} from "@/core/interpreter/part/utils";

export class CustomReductionMultiplierCalculationPart extends CalculationPart {
    public maximumReductionPercent: number = 0
    public part: CalculationPart | null = null

    override GetValue(ctx: SkillCalculationContext): number {
        if (this.part == null) {
            return 0
        }

        const result = this.part.GetValue(ctx)
        const clamp = Math.max(Math.min(result, this.maximumReductionPercent), 0)
        return 1 - clamp
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        let v: string = ''
        const keys = Object.keys(json)
        for (const s of keys) {
            if (s.includes('{')) {
                v = s
            }
        }

        if (v != '') {
            this.part = PartFromJson(json[v], ctx)
        }

        this.maximumReductionPercent = json.mMaximumReductionPercent
    }

    override GetType(): number {
        return 0;
    }
}