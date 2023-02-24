import {ChampionThumbnailHolder} from "@/components/champion/championThumbnaliHolder";
import {BLUE_TEAM, RED_TEAM, selectedChampionStats} from "@/core/state/uiState";
import {ChampionList} from "@/components/champion/championList";
import {useReactiveVar} from "@apollo/client/react";

export const ChampionSelect = () => {
    return (
        <div className="flex justify-between h-96">
            <div className="flex basis-1/6 items-center justify-center mr-6">
                <ChampionThumbnailHolder side={RED_TEAM} />
            </div>
            <div className="basis-4/6 h-96 overflow-y-auto pl-2 pr-2">
                <ChampionList />
            </div>
            <div className="flex basis-1/6 items-center justify-center ml-6">
                <ChampionThumbnailHolder side={BLUE_TEAM}/>
            </div>
        </div>
    )
}
