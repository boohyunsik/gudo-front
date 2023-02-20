import * as React from 'react';
import {selectedChampion, selectedChampionSide} from "@/state/ui-interaction/uiState";
import {useReactiveVar} from "@apollo/client/react";

export interface Props {

}

export type Champion = {
    id: string
    name: string
    thumbnailUrl: string
}

const champions: Champion[] = [
    {
        id: "1",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "2",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "3",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "4",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "5",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "6",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "7",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "8",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "9",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "10",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "11",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "12",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "13",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "14",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "15",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "16",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "17",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "18",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "19",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
    {
        id: "20",
        name: "럼블",
        thumbnailUrl: "https://ddable.com/wp-content/uploads/2017/03/rumble.png"
    },
]

export const ChampionSelectHolder = ({}: Props) => {
    const currentChampionSide = useReactiveVar(selectedChampionSide)
    const currentChampionState = useReactiveVar(selectedChampion)
    const onClick = (e: any) => {
        currentChampionState[currentChampionSide] = e.target.id
        selectedChampion([...currentChampionState])
    }

    return (
        <div className="grid grid-cols-10 sm:grid-cols-10 gap-0 content-start gap-1">
        {champions.map((champion) => (
          <div className="cursor-pointer" onClick={onClick}>
            <img id={champion.id} className="h-10 w-10" src={champion.thumbnailUrl} alt="" />
          </div>
        ))}
      </div>
    )
}
