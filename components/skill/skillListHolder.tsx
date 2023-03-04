import { useChampionAttackAndSkills } from "@/core/hooks/useChampionAttackAndSkills";
import { useState } from "react";
import { LOL_VERSION } from "@/utils/config";
import Image from "next/image";
import { useSkill } from "@/core/hooks/useSkill";
import { Tooltip } from "@material-tailwind/react";
import {calculateChampionSpec} from "@/core/engine/specCalculator";

export interface Props {
  championId: string
  championName: string
  side: number
}

export const SkillListHolder = ({ championId, championName, side }: Props) => {
  const championDetail = useChampionAttackAndSkills(championId)
  const spec = calculateChampionSpec(championName, 1)

  const { addSkill } = useSkill(side)

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
        <div className={"grid grid-rows-1 grid-cols-6 sm:grid-cols-6 gap-1 content-start"}>
        {
          championDetail?.map((skill: any, index: number) => {
            switch (skill.type) {
              case 'attack':
                return (
                    <Tooltip content="일반 공격" placement="bottom">
                      <Image
                          className="cursor-pointer rounded-md"
                          src={`/ddragon/${LOL_VERSION}/img/item/1055.png`}
                          width='48'
                          height='48'
                          loading='eager'
                          priority
                          onClick={e => onClickSingleSkill(e, index)}
                          alt={''}/>
                    </Tooltip>
                )
              case 'passive':
                return (
                    <Tooltip content={skill.data.name} placement="bottom">
                      <Image
                          className="cursor-pointer rounded-md"
                          src={`/ddragon/${LOL_VERSION}/img/passive/${skill.data.image.full}`}
                          width='48'
                          height='48'
                          loading='eager'
                          priority
                          onClick={e => onClickSingleSkill(e, index)}
                          alt={''}/>
                    </Tooltip>
                )
              default:
                return (
                    <Tooltip content={skill.data.name} placement="bottom">
                      <Image
                          className="cursor-pointer rounded-md"
                          src={`/ddragon/${LOL_VERSION}/img/spell/${skill.data.image.full}`}
                          width='48'
                          height='48'
                          loading='eager'
                          priority
                          onClick={e => onClickSingleSkill(e, index)}
                          alt={''}/>
                    </Tooltip>
                )
            }
          })
        }
      </div>
    </>
  )
}
