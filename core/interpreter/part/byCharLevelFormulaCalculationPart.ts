import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class ByCharLevelFormulaCalculationPart extends CalculationPart {
    public values: number[] = []

    override GetValue(ctx: SkillCalculationContext): number {
        return this.values[ctx.championLevel]
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const valuesFromJson = json.mValues
        const keys = Object.keys(valuesFromJson)
        for (const key of keys) {
            const item = valuesFromJson[key]
            this.values.push(item)
        }
    }

    override GetType(): number {
        return 0;
    }
}