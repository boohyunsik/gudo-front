import {useChampionSpec} from "@/core/hooks/useChampionSpec";
import {SpecItem} from "@/components/spec/specItem";
import {useReactiveVar} from "@apollo/client/react";
import {selectedChampion} from "@/core/state/uiState";

export const SpecHolder = () => {
    const championSpec = useChampionSpec("Aatrox")
    const selectedChampionList = useReactiveVar(selectedChampion)
    console.log(championSpec)
    return (
        <div className="grid grid-cols-2 grid-flow-col auto-cols-max">
            <div>
                <SpecItem championName={selectedChampionList[0]?.id || ""} />
            </div>
            <div>
                <SpecItem championName={selectedChampionList[1]?.id || ""} />
            </div>
        </div>
    )
}