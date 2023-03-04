import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class ByCharLevelInterpolationCalculationPart extends CalculationPart {
    public startValue: number = 0
    public endValue: number = 0
    public bool1: boolean = false
    public bool2: boolean = false

    override GetValue(ctx: SkillCalculationContext): number {
        return this.startValue + (this.endValue - this.startValue) * (ctx.championLevel / 18)
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const sv = json.mStartValue
        if (sv != null) {
            this.startValue = sv
        }

        const ev = json.mEndValue
        if (ev != null) {
            this.endValue = ev
        }

        let set = false
        const keys = Object.keys(json)
        for (let i = 0; i < keys.length; i++) {
            const s = json[keys[i]]
            if (keys[i] === 'mStartValue' || keys[i] === 'mEndValue' || keys[i] === '__type') {
                continue
            }

            if (s === true || s === false) {
                if (set) {
                    this.bool2 = s
                    break
                }
                this.bool1 = s
                set = true
            }
        }
    }

    override GetType(): number {
        return 0;
    }
}