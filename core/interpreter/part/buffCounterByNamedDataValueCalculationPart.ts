import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {AbilityResourceType, StatFormulaType} from "@/core/interpreter/constants";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {getBinHash} from "@/core/interpreter/interpreter";
import {DataValue} from "@/core/model/skill";

export class BuffCounterByNamedDataValueCalculationPart  extends CalculationPart {
    public buffName: string = ''
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
        if (json.mBuffName != null) {
            this.buffName = json.mBufName
        }

        const name = json.mDataValue as string
        if (name != null) {
            ctx.dataValues.forEach((value, key) => {
                if (key === name || getBinHash(key) === name) {
                    this.dataValue = value
                }
            })

        }
    }

    override GetType(): number {
        return 0;
    }
}