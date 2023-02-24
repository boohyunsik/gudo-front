import {useChampionSpec} from "@/core/hooks/useChampionSpec";
import {SpecItem} from "@/components/stats/specItem";
import {useReactiveVar} from "@apollo/client/react";
import {BLUE_TEAM, RED_TEAM, selectedChampion} from "@/core/state/uiState";

export const SpecHolder = () => {
    const championSpec = useChampionSpec("Aatrox")
    const selectedChampionList = useReactiveVar(selectedChampion)
    console.log('id', selectedChampionList[0]?.id)
    return (
        <div className="grid grid-cols-2 grid-flow-col auto-cols-max">
            {
                selectedChampionList[0] != null ? (
                    <div>
                        <SpecItem side={RED_TEAM} championName={selectedChampionList[0]?.id || ""} />
                    </div>
                ) : (
                    <></>
                )
            }
            {
                selectedChampionList[1] != null ? (
                    <div>
                        <SpecItem side={BLUE_TEAM} championName={selectedChampionList[1]?.id || ""} />
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}
