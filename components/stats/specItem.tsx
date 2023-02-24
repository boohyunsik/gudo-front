import {useChampionSpec} from "@/core/hooks/useChampionSpec";
import {ChampionSpec} from "@/core/model/champion";
import {selectedChampionStats, selectedItemList, selectedLevel} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";
import {calculateSpec, Spec} from "@/core/engine/calculator";

export interface Props {
    side: number
    championName: string
}

export const SpecItem = ({ side, championName }: Props) => {
    const championSpec: ChampionSpec | null = useChampionSpec(championName)
    const currentSelectedLevel = useReactiveVar(selectedLevel)
    const currentStat = useReactiveVar(selectedChampionStats)[side]
    const currentItem = useReactiveVar(selectedItemList)[side]

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
                                hp: { calculateSpec(currentStat.hp, currentStat.hpPerLevel, currentSelectedLevel[side], currentItem, Spec.HP) }
                            </div>
                            <div>
                                mp: { calculateSpec(currentStat.mp, currentStat.mpPerLevel, currentSelectedLevel[side], currentItem, Spec.MP) }
                            </div>
                            <div>
                                공격력: { calculateSpec(currentStat.attackDamage, currentStat.attackDamagePerLevel, currentSelectedLevel[side], currentItem, Spec.ATTACK) }
                            </div>
                            <div>
                                주문력: { calculateSpec(0, 0, currentSelectedLevel[side], currentItem, Spec.MAGIC) }
                            </div>
                            <div>
                                방어력: { calculateSpec(currentStat.armor, currentStat.armorPerLevel, currentSelectedLevel[side], currentItem, Spec.ARMOR) }
                            </div>
                            <div>
                                마법저항력: { calculateSpec(currentStat.spellBlock, currentStat.spellBlockPerLevel, currentSelectedLevel[side], currentItem, Spec.SPELL_BLOCK) }
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
