import {
    championWrapperState,
    selectedChampionStatFormula,
    selectedChampionStats,
    selectedItemList,
    selectedLevel
} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";
import {calculateSpec, Spec} from "@/core/engine/calculator";
import {calculateChampionSpec} from "@/core/engine/specCalculator";
import {StatFormulaType, StatType} from "@/core/interpreter/constants";
import {ChampionWrapper} from "@/core/model/champion";

export interface Props {
    side: number
    championName: string
}

export const SpecItem = ({ side, championName }: Props) => {
    // const championSpec: ChampionSpec | null = useChampionSpec(championName)
    const c = useReactiveVar(selectedChampionStatFormula)[side]
    const currentSelectedLevel = useReactiveVar(selectedLevel)
    const currentStat = useReactiveVar(selectedChampionStats)[side]
    const currentItem = useReactiveVar(selectedItemList)[side]

    const currentChamp: ChampionWrapper = useReactiveVar<ChampionWrapper[]>(championWrapperState)[side]
    const stat = currentChamp.getCurrentStat()

    const onLevelChanged = (e: any) => {
        if (e.target.value === 0 || e.target.value === '') {
            currentSelectedLevel[side] = 1
            selectedLevel([...currentSelectedLevel])
            currentChamp.level = 1
            return
        }
        currentSelectedLevel[side] = e.target.value
        selectedLevel([...currentSelectedLevel])
        currentChamp.level = e.target.value
    }

    return (
        <>
            {
                currentStat == null ?
                    (<></>) :
                    (<>
                        <div>
                            레벨: <input type="text" onChange={onLevelChanged} className="bg-gray-50 border border-gray-300 text-gray-900" defaultValue="1" />
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                hp: { stat?.values.get(StatType.MaxHealth)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                mp: { calculateSpec(currentStat.mp, currentStat.mpPerLevel, currentSelectedLevel[side], currentItem, Spec.MP) }
                            </div>
                            <div>
                                공격력: { stat?.values.get(StatType.Attack)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                주문력: { stat?.values.get(StatType.AbilityPower)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                방어력: { stat?.values.get(StatType.Armor)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                마법저항력: { stat?.values.get(StatType.MagicResist)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                레벨 당 공격력: { stat?.values.get(StatType.DamagePerLevel)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                레벨 당 방어력: { stat?.values.get(StatType.ArmorPerLevel)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                레벨 당 마법저항력: { stat?.values.get(StatType.SpellBlockPerLevel)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                성장 체력: { stat?.values.get(StatType.HpPerLevel)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                5초당 체력 회복: { stat?.values.get(StatType.HealthRegenRate)?.toFixed(1) || 0 }
                            </div>
                            <div>
                                성장 체력 회복: { stat?.values.get(StatType.HpRegenPerLevel)?.toFixed(1) || 0 }
                            </div>
                        </div>
                    </>)
            }
        </>
    )
}
