import * as React from 'react';

export interface Props {

}

export const ChampionThumbnailHolder = ({}: Props) => {
    return (
        <div className="cursor-pointer">
            <img className="h-48 w-48 rounded-full" src={'https://ddable.com/wp-content/uploads/2017/03/rumble.png'} alt="" />
        </div>
    )
}