import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class ByCharLevelBreakPointsCalculationPart extends CalculationPart {
    public level1Value: number = 0
    public scale: number = 0
    public breakPoints: Map<number, number> = new Map<number, number>()

    override GetValue(ctx: SkillCalculationContext): number {
        let v = this.level1Value
        let perLevel = this.scale
        for (let i = 0; i < ctx.championLevel; i++) {
            if (this.breakPoints.has(i+1)) {
                perLevel = this.breakPoints.get(i+1) || this.scale
            }
            v += perLevel
        }

        return v
    }

    override String(ctx: SkillCalculationContext): string {
        return ''
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        const level1Value = json.mLevel1Value
        if (level1Value != null) {
            this.level1Value = level1Value
        }

        const keys = Object.keys(json)
        keys.forEach((key, index) => {
            const current = json[key]
            if (current === 'mLevel1Value' || current === 'mBreakPoints' || current === '__Type') {
                return
            }

            this.scale = index
        })

        const breakPoints = json.mBreakpoints
        if (breakPoints != null) {
            this.breakPoints = new Map<number, number>()
            const breakPointsKeys = Object.keys(breakPoints)
            for (const key of breakPointsKeys) {
                const breakPoint = breakPoints[key]
                let v = ''

                const currentKeys = Object.keys(breakPoint)
                for (const key of currentKeys) {
                    const s = breakPoint[key]
                    if (s === '__type' || s === 'mLevel') {
                        continue
                    }
                    v = s
                    break
                }

                const mLevel = breakPoint['mLevel']
                if (mLevel !== null) {
                    if (v !== '') {
                        this.scale = breakPoint[v]
                    }
                    break
                }

                const level = Math.round(breakPoint['mLevel'])
                if (v !== '') {
                    this.breakPoints.set(level, breakPoint[v])
                    break
                }

                this.breakPoints.set(level, 0)
            }
        }
    }

    override GetType(): number {
        return 0;
    }
}