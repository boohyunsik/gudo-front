import {useReactiveVar} from "@apollo/client/react";
import {selectedSkillList} from "@/state/ui-interaction/uiState";
import Image from "next/image";
import {DDRAGON_REST_URL, LOL_VERSION} from "@/utils/config";

export const SelectedSkillHolder = ({ side }: any) => {
  const currentSelectedSkillList: any[] = useReactiveVar(selectedSkillList)

  const onClick = (e: any, index: number) => {
    currentSelectedSkillList[side].splice(index, 1)
    console.log(currentSelectedSkillList[side])
    selectedSkillList([...currentSelectedSkillList])
  }

  return (
    <div className={'flex justify-start bg-sky-500'}>
      {
        currentSelectedSkillList[side].map((skill: any, index: number) => {
          return (
            <div key={`selected-skill-${index}`} onClick={e => onClick(e, index)}>
              <Image className="cursor-pointer rounded-md" src={`/ddragon/${LOL_VERSION}/img/spell/${skill.data.image.full}`} alt={''} width='48' height='48' />
            </div>
          )
        })
      }
    </div>
  )
}
