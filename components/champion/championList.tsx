import * as React from 'react';
import {
    BLUE_TEAM,
    RED_TEAM,
    selectedChampion,
    selectedChampionSide,
    selectedChampionStats,
    selectedSkillList
} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";
import {useChampionList} from "@/core/hooks/useChampionList";
import {getSquareImageUrl} from "@/utils/utils";
import {Tooltip} from "@material-tailwind/react";
import Image from "next/image";

export interface Props {

}

export const ChampionList = ({}: Props) => {
    const championList = useChampionList()
    const currentChampionSide = useReactiveVar(selectedChampionSide)
    const currentChampionState = useReactiveVar(selectedChampion)
    const currentSelectedSkillList = useReactiveVar(selectedSkillList)
    const onClick = (e: any, targetChampionId: string) => {
        const c = championList?.find((champion) => champion.id === targetChampionId)
        if (c != null) {
            currentChampionState[currentChampionSide] = c
            selectedChampion([...currentChampionState])
            selectedChampionStats([currentChampionState[RED_TEAM]?.stats, currentChampionState[BLUE_TEAM]?.stats])
            currentSelectedSkillList[currentChampionSide] = []
            selectedSkillList([...currentSelectedSkillList])
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
