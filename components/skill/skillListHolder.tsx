import {useChampionAttackAndSkills} from "@/core/hooks/useChampionAttackAndSkills";
import {useEffect, useState} from "react";
import {DDRAGON_REST_URL, LOL_VERSION} from "@/utils/config";
import Image from "next/image";
import {useSelectedSkillList} from "@/core/hooks/useSelectedSkillList";
import {SelectedSkillHolder} from "@/components/skill/selectedSkillHolder";

export interface Props {
  championId: string
  championName: string
  side: number
}

export const SkillListHolder = ({ championId, championName, side }: Props) => {
  const championDetail = useChampionAttackAndSkills(championId)
  const { addSkill } = useSelectedSkillList(side)
  const [skills, setSkills] = useState<any[]>([null, null, null, null, null])

  const onClickSingleSkill = (e: any, index: number) => {
    if (index === 0) {
      addSkill({
        type: 'attack'
      })
    } else {
      if (championDetail != null) {
        const skill = championDetail[index]
        addSkill(skill)
      }
    }
  }

  return (
    <>
      <div className={"grid grid-rows-1 grid-cols-5 sm:grid-cols-5 gap-1 content-start"}>
        {
          championDetail?.map((skill: any, index: number) => {
            if (skill.type === 'attack') {
              return (
                <div key={0} className="cursor-pointer" onClick={e => onClickSingleSkill(e, 0)}>
                  <Image
                    className="rounded-md"
                    src={`/ddragon/${LOL_VERSION}/img/item/1055.png`}
                    width='48'
                    height='48'
                    loading='eager'
                    priority
                    alt={''}/>
                </div>
              )
            }

            return (
              <div key={index + 1} className='cursor-pointer' onClick={e => onClickSingleSkill(e, index)}>
                <Image
                  className="rounded-md"
                  src={`/ddragon/${LOL_VERSION}/img/spell/${skill.data.image.full}`}
                  width='48'
                  height='48'
                  loading='eager'
                  priority
                  alt={''}/>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
