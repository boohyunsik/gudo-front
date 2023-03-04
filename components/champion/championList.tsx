import * as React from 'react';
import {
    BLUE_TEAM, championWrapperState, fontConfig,
    RED_TEAM,
    selectedChampion,
    selectedChampionSide, selectedChampionStatFormula,
    selectedChampionStats,
    selectedSkillList
} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";
import {useChampionList} from "@/core/hooks/useChampionList";
import {getSquareImageUrl} from "@/utils/utils";
import {Tooltip} from "@material-tailwind/react";
import Image from "next/image";
import {calculateChampionSpecWithBoneData} from "@/core/engine/specCalculator";
import {useChampion} from "@/core/hooks/useChampionSpec";

export interface Props {

}

export const ChampionList = ({}: Props) => {
    const championList = useChampionList()
    const currentChampionSide = useReactiveVar(selectedChampionSide)
    const currentChampionState = useReactiveVar(selectedChampion)
    const currentSelectedSkillList = useReactiveVar(selectedSkillList)
    const font = useReactiveVar(fontConfig)

    const championState = useReactiveVar(championWrapperState)

    const onClick = async (e: any, targetChampionId: string) => {
        const c = championList?.find((champion) => champion.id === targetChampionId)
        if (c != null) {

            // useChampion(
            //     currentChampionState[currentChampionSide]?.id || '',
            //     currentChampionState[currentChampionSide]?.name || '',
            //     font).then((champion) => {
            //     console.log('##### RESULT OF CDRAGON CHAMPION #####', champion)
            //     // championState[currentChampionSide] = r
            //     // championWrapperState([...championState])
            // })
            const cc = await useChampion(c.id, c.name, font)

            console.log('cc', cc)
            currentChampionState[currentChampionSide] = c
            selectedChampion([...currentChampionState])
            selectedChampionStats([currentChampionState[RED_TEAM]?.stats, currentChampionState[BLUE_TEAM]?.stats])
            selectedChampionStatFormula([calculateChampionSpecWithBoneData(currentChampionState[RED_TEAM]?.stats, 1), currentChampionState[BLUE_TEAM]?.stats])
            currentSelectedSkillList[currentChampionSide] = []
            selectedSkillList([...currentSelectedSkillList])

            championState[currentChampionSide] = cc
            championWrapperState([...championState])
        }
    }

    const isSelected = (championId: string) => {
        return currentChampionState[0]?.id === championId || currentChampionState[1]?.id === championId
    }

    return (
      <div className="grid grid-cols-10 sm:grid-cols-10 gap-0 content-start gap-1 h-100 overflow-y-auto">
        {championList?.map((champion) => (
            <Tooltip content={champion.name} placement="bottom">
                <Image className={`rounded-md cursor-pointer ${isSelected(champion.id) ? "grayscale" : ""}`}
                       src={getSquareImageUrl(champion.image.full)}
                       onClick={e => onClick(e, champion.id)}
                       alt={''} width='80' height='80' />
            </Tooltip>
        ))}
      </div>
    )
}
