import {CalculationPart} from "@/core/interpreter/part/calculationPart";
import {AbilityResourceType, StatFormulaType} from "@/core/interpreter/constants";
import {ParsingContext, SkillCalculationContext} from "@/core/model/champion";

export class AbilityResourceByCoefficientCalculationPart extends CalculationPart {
    public coefficient: number = 0
    public abilityResource: AbilityResourceType = 0
    public statFormula: StatFormulaType = 0

    override GetValue(ctx: SkillCalculationContext): number {
        return 0
    }

    override String(ctx: SkillCalculationContext): string {
        return `${Math.round(this.coefficient * 100)} ${this.abilityResource}`
    }

    override FromJson(json: any, ctx: ParsingContext): any {
        if (json.mCoefficient != null) {
            this.coefficient = json.mCoefficient
        }

        if (json.mStatFormula != null) {
            this.statFormula = json.mStatFormula
        }

        if (json.mAbilityResource != null) {
            this.abilityResource = json.mAbilityResource
        }
    }

    override GetType(): number {
        return 0;
    }
}