import {selectedChampion, selectedChampionSide} from '@/core/state/uiState';
import * as React from 'react';
import {useReactiveVar} from "@apollo/client/react";
import {getSquareImageUrl} from "@/utils/utils";
import {SkillListHolder} from "@/components/skill/skillListHolder";
import Image from "next/image";

export interface Props {
    side: number
}

export const ChampionThumbnailHolder = ({ side }: Props) => {
    const currentSelectedTeamSide = useReactiveVar(selectedChampionSide)
    const currentSelectedChampion = useReactiveVar(selectedChampion)[side]
    const onClick = (e: any) => {
        selectedChampionSide(side)
    }

    return (
      <div className='flex-col items-center'>
          <div className="cursor-pointer" onClick={onClick}>
              <img
                className={`w-48 rounded-full border-solid border-4 ${currentSelectedTeamSide === side ? "border-red-500" : "border-white-500"}`}
                src={`${getSquareImageUrl(currentSelectedChampion.image?.full || "")}`}
                alt="" />
          </div>
          <div className="h-16 mt-6">
              <SkillListHolder championId={currentSelectedChampion.id || ""} championName={currentSelectedChampion.name || ""} side={side} />
          </div>
      </div>
    )
}
