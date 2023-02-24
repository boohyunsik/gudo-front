import {useChampionSpec} from "@/core/hooks/useChampionSpec";
import {ChampionSpec} from "@/core/model/champion";
import {useState} from "react";
import {selectedChampionStats, selectedLevel} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";
import {calculateLinearSpec} from "@/core/engine/calculator";

export interface Props {
    side: number
    championName: string
}

export const SpecItem = ({ side, championName }: Props) => {
    const championSpec: ChampionSpec | null = useChampionSpec(championName)
    const currentSelectedLevel = useReactiveVar(selectedLevel)
    const currentStat = useReactiveVar(selectedChampionStats)[side]

    const onLevelChanged = (e: any) => {
        if (e.target.value === 0 || e.target.value === '') {
            currentSelectedLevel[side] = 1
            selectedLevel([...currentSelectedLevel])
            return
        }
        currentSelectedLevel[side] = e.target.value
        selectedLevel([...currentSelectedLevel])
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
                                hp: { calculateLinearSpec(currentStat.hp, currentStat.hpPerLevel, currentSelectedLevel[side]) }
                            </div>
                            <div>
                                mp: { calculateLinearSpec(currentStat.mp, currentStat.mpPerLevel, currentSelectedLevel[side]) }
                            </div>
                            <div>
                                공격력: { calculateLinearSpec(currentStat.attackDamage, currentStat.attackDamagePerLevel, currentSelectedLevel[side]) }
                            </div>
                            <div>
                                주문력: 0
                            </div>
                            <div>
                                방어력: { calculateLinearSpec(currentStat.armor, currentStat.armorPerLevel, currentSelectedLevel[side]) }
                            </div>
                            <div>
                                마법저항력: { calculateLinearSpec(currentStat.spellBlock, currentStat.spellBlockPerLevel, currentSelectedLevel[side]) }
                            </div>
                            <div>
                                레벨 당 공격력: { currentStat.attackDamagePerLevel }
                            </div>
                            <div>
                                레벨 당 방어력: { currentStat.armorPerLevel }
                            </div>
                            <div>
                                레벨 당 마법저항력: { currentStat.spellBlockPerLevel }
                            </div>
                            <div>
                                성장 체력: { currentStat.hpPerLevel }
                            </div>
                            <div>
                                5초당 체력 회복: { currentStat.hpRegen }
                            </div>
                            <div>
                                성장 체력 회복: { currentStat.hpRegenPerLevel }
                            </div>
                        </div>
                    </>)
            }
        </>
    )
}
