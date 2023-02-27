import Image from "next/image";
import { LOL_VERSION } from "@/utils/config";
import { useSkill } from "@/core/hooks/useSkill";
import { Tooltip } from "@material-tailwind/react";

export const SelectedSkillHolder = ({ side }: any) => {
  const { selectedSkills, removeSkill } = useSkill(side)

  return (
    <div className={'flex justify-start bg-sky-500'}>
      {
        selectedSkills.map((skill: any, index: number) => {
          let iconDir = ''
          switch (skill.type) {
            case 'attack':
              iconDir = `/ddragon/${LOL_VERSION}/img/item/1055.png`
              break
            case 'passive':
              iconDir = `/ddragon/${LOL_VERSION}/img/passive/${skill.data.image.full}`
              break
            case 'skill':
              iconDir = `/ddragon/${LOL_VERSION}/img/spell/${skill.data.image.full}`
              break
            default:
              // TODO: error icon
          }
          return (
              <Tooltip content={skill.data.name} placement="bottom">
                <Image className="cursor-pointer rounded-md" src={iconDir} alt={''} width='48' height='48' onClick={e => removeSkill(index)} />
              </Tooltip>
          )
        })
      }
    </div>
  )
}
