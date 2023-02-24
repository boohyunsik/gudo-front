import {useChampionSpec} from "@/core/hooks/useChampionSpec";
import {ChampionSpec} from "@/core/model/champion";
import {useState} from "react";
import {selectedChampionStats, selectedLevel} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";

export interface Props {
    side: number
    championName: string
}

export const SpecItem = ({ side, championName }: Props) => {
    const championSpec: ChampionSpec | null = useChampionSpec(championName)
    const currentSelectedLevel = useReactiveVar(selectedLevel)
    const currentStat = useReactiveVar(selectedChampionStats)
    const [level, setLevel] = useState<number>(1)

    console.log('currentStat', currentStat)

    const onLevelChanged = (e: any) => {
        currentSelectedLevel[side] = e.target.value
        selectedLevel([...currentSelectedLevel])
        currentStat[side].hp = currentStat[side].hp + currentStat[side].hpPerLevel * (currentSelectedLevel[side] - 1)
        currentStat[side].mp = currentStat[side].mp + currentStat[side].mpPerLevel * (currentSelectedLevel[side] - 1)
        currentStat[side].attack = currentStat[side].attack + currentStat[side].attackDamagePerLevel * (currentSelectedLevel[side] - 1)
        currentStat[side].armor = currentStat[side].armor + currentStat[side].armorPerLevel * (currentSelectedLevel[side] - 1)
        currentStat[side].spellBlock = currentStat[side].spellBlock + currentStat[side].spellBlockPerLevel * (currentSelectedLevel[side] - 1)
        selectedChampionStats([...currentStat])
    }
    console.log('championSpec', championSpec)
    return (
        <>
            {
                championSpec == null ?
                    (<></>) :
                    (<>
                        <div>
                            레벨: <input type="text" onChange={onLevelChanged} className="bg-gray-50 border border-gray-300 text-gray-900" defaultValue="1" />
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                hp: { currentStat[side] }
                            </div>
                            <div>
                                mp: { championSpec.mp + championSpec.mpPerLevel * (level - 1) }
                            </div>
                            <div>
                                공격력: { championSpec.attackDamage + championSpec.attackDamagePerLevel * (level - 1) }
                            </div>
                            <div>
                                주문력: 0
                            </div>
                            <div>
                                방어력: { championSpec.armor + championSpec.armorPerLevel * (level - 1) }
                            </div>
                            <div>
                                마법저항력: { championSpec.spellBlock + championSpec.spellBlockPerLevel * (level - 1) }
                            </div>
                            <div>
                                레벨 당 공격력: {championSpec.attackDamagePerLevel}
                            </div>
                            <div>
                                레벨 당 방어력: {championSpec.armorPerLevel}
                            </div>
                            <div>
                                레벨 당 마법저항력: {championSpec.spellBlockPerLevel}
                            </div>
                            <div>
                                성장 체력: {championSpec.hpPerLevel}
                            </div>
                            <div>
                                5초당 체력 회복: {championSpec.hpRegen}
                            </div>
                            <div>
                                성장 체력 회복: {championSpec.hpRegenPerLevel}
                            </div>
                        </div>
                    </>)
            }
        </>
    )
}