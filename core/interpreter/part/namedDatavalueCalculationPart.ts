import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {DataValue} from "@/core/model/skill";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {getBinHash} from "@/core/interpreter/interpreter";

export class NamedDataValueCalculationPart extends CalculationPart {
    public dataValue: DataValue | null = null

    override GetValue(ctx: SkillCalculationContext): number {
        if (this.dataValue == null) {
            return 0
        }

        return this.dataValue.values[ctx.spellRank]
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const name = json.mDataValue
        ctx.dataValues.forEach((value, key) => {
            if (key === name || getBinHash(key) === name) {
                this.dataValue = value
            }
        })
    }

    override GetType(): number {
        return 0;
    }
}