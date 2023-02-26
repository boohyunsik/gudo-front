import {useReactiveVar} from "@apollo/client/react";
import {selectedSkillList} from "@/core/state/uiState";

export const useSkill = (team: number) => {
  const currentSkillList = useReactiveVar<any[]>(selectedSkillList)

  const addSkill = (skill: any) => {
    currentSkillList[team].push(skill)
    selectedSkillList([...currentSkillList])
  }

  const removeSkill = (index: number) => {
    currentSkillList[team].splice(index, 1)
    selectedSkillList([...currentSkillList])
  }

  return { selectedSkills: currentSkillList[team], addSkill, removeSkill }
}
