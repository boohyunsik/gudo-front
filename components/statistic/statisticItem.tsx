import {useReactiveVar} from "@apollo/client/react";
import {selectedSkillList} from "@/core/state/uiState";

export interface Props {
    side: number
}

export const StatisticItem = ({ side }: Props) => {
    const selectedSkill = useReactiveVar(selectedSkillList)
    console.log(side, selectedSkill)
    return (
        <>
        </>
    )
}