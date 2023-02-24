import {useReactiveVar} from "@apollo/client/react";
import {selectedSkillList} from "@/core/state/uiState";

export const useSelectedSkillList = (team: number) => {
  const currentSkillList = useReactiveVar(selectedSkillList)
  console.log('currentSkillList', currentSkillList)

  const addSkill = (skill: any) => {
    currentSkillList[team].push(skill)
    selectedSkillList([...currentSkillList])
  }

  return { addSkill }
}