import * as React from 'react';
import {selectedChampion, selectedChampionSide, selectedChampionStats} from "@/core/state/uiState";
import {useReactiveVar} from "@apollo/client/react";
import {useChampionList} from "@/core/hooks/useChampionList";
import {useState} from "react";
import {getSquareImageUrl} from "@/utils/utils";
import {useChampionSpec, useChampionSpec2} from "@/core/hooks/useChampionSpec";

export interface Props {

}

export const ChampionList = ({}: Props) => {
    const championList = useChampionList()
    const currentChampionSide = useReactiveVar(selectedChampionSide)
    const currentChampionState = useReactiveVar(selectedChampion)
    const currentChampionStats = useReactiveVar(selectedChampionStats)
    const { getSpecById } = useChampionSpec2()
    const onClick = (e: any) => {
        const c = championList?.find((champion) => champion.id == e.target.id)
        if (c != null) {
            currentChampionState[currentChampionSide] = c
            selectedChampion([...currentChampionState])
        }
    }

    const isSelected = (championId: string) => {
        return currentChampionState[currentChampionSide].id === championId
    }

    return (
      <div className="grid grid-cols-10 sm:grid-cols-10 gap-0 content-start gap-1 h-100 overflow-y-auto">
        {championList?.map((champion) => (
          <div className={`cursor-pointer ${isSelected(champion.id) ? "grayscale" : ""}`} key={champion.id} onClick={onClick}>
            <img id={champion.id} className="rounded-md w-20" src={getSquareImageUrl(champion.image.full)} alt="" />
          </div>
        ))}
      </div>
    )
}
