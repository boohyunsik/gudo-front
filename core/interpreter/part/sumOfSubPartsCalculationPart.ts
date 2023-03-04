import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {PartFromJson} from "@/core/interpreter/part/utils";

export class SumOfSubPartsCalculationPart  extends CalculationPart {
    public subParts: CalculationPart[] = []

    override GetValue(ctx: SkillCalculationContext): number {
        let res = 0
        for (const subPart of this.subParts) {
            res += subPart.GetValue(ctx)
        }

        return res
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const subPart = json.mSubPart
        if (subPart != null) {
            // TODO
            const keys = Object.keys(subPart)
            for (const key of keys) {
                const item = subPart[key]
                const part = PartFromJson(item, ctx)
                if (part != null) {
                    this.subParts.push(part)
                }
            }
            return
        }

        const subparts = json.mSubparts
        if (subparts != null) {
            const keys = Object.keys(subparts)
            for (const key of keys) {
                const item = subparts[key]
                const part = PartFromJson(item, ctx)
                if (part != null) {
                    this.subParts.push(part)
                }
            }
            return
        }

        const part = PartFromJson(json.mSubPart, ctx)
        if (part != null) {
            this.subParts.push()
        }
    }

    override GetType(): number {
        return 0;
    }
}