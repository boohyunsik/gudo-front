import {useReactiveVar} from "@apollo/client/react";
import {selectedChampionStats, selectedLevel, selectedSkillList} from "@/core/state/uiState";

export interface Props {
    side: number
}

export const StatisticItem = ({ side }: Props) => {
    const currentLevel = useReactiveVar(selectedLevel)[side]
    const currentStat = useReactiveVar(selectedChampionStats)[side]
    const selectedSkill = useReactiveVar(selectedSkillList)[side]
    console.log(selectedSkill)
    return (
        <>
        </>
    )
}
