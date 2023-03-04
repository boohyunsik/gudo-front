import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";
import {PartFromJson} from "@/core/interpreter/part/utils";

export class GameCalculation {
    public name: string = ''
    public formulaParts: CalculationPart[] = []
    public displayAsPercent: boolean = false
    public precision: number = 0
    public multiplier: CalculationPart | null = null

    getName() {
        return this.name
    }

    value(ctx: SkillCalculationContext): number {
        if (this.multiplier != null) {
            ctx.multiplier *= this.multiplier.GetValue(ctx)
        }
        let result = 0
        this.formulaParts.forEach((part, key) => {
            result += part.GetValue(ctx) * ctx.multiplier
        })

        return result
    }

    toString(ctx: SkillCalculationContext): string {
        let str = ''
        this.formulaParts.forEach((part, index) => {
            if (part == null) {
                return
            }

            str += part.String(ctx)
            if (index != this.formulaParts.length - 1) {
                str += ' + '
            }
        })

        if (this.displayAsPercent) {
            let v = parseFloat(str)
            if (isNaN(v)) {
                return str
            }
            v = v * 100
            let vs = v.toFixed(1)
            return `${vs}%`
        }

        return ''
    }

    fromJson(name: string, json: any, ctx: ParsingContext) {
        this.name = name

        const parts = json.mFormulaParts
        const keys = Object.keys(parts)
        for (const key of keys) {
            const part = PartFromJson(parts[key], ctx)
            if (part != null) {
                this.formulaParts.push(part)
            }
        }

        const mMultiplier = json.mMultiplier
        if (mMultiplier != null) {
            const part = PartFromJson(mMultiplier, ctx)
            if (part != null) {
                this.multiplier = part
            }
        }

        const mDisplayAsPercent = json.mDisplayAsPercent
        if (mDisplayAsPercent != null) {
            this.displayAsPercent = mDisplayAsPercent
        }

        const mPrecision = json.mPrecision
        if (mPrecision != null) {
            this.precision = mPrecision
        }
    }
}

