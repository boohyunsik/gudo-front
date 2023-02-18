import { selectedChampionSide } from '@/state/ui-interaction/UiState';
import * as React from 'react';

export interface Props {
    side: number
}

export const ChampionThumbnailHolder = ({ side }: Props) => {

    const onClick = (e: any) => {
        selectedChampionSide(side)
    }

    return (
        <div className="cursor-pointer" onClick={onClick}>
            <img className="h-48 w-48 rounded-full" src={'https://ddable.com/wp-content/uploads/2017/03/rumble.png'} alt="" />
        </div>
    )
}