import * as React from 'react';

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
    }
]

export const ChampionSelectHolder = ({}: Props) => {
    return (
        <div className="grid grid-cols-10 sm:grid-cols-10 gap-0">
        {champions.map((champion) => (
          <div key={champion.id}>
            <img className="h-10 w-10" src={champion.thumbnailUrl} alt="" />
          </div>
        ))}
      </div>
    )
}