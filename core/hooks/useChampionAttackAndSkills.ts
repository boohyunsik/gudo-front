import {useQuery} from "@apollo/client/react";
import {ChampionDetail} from "@/core/apollo/query/champion";
import {ApiEndpoint} from "@/core/apollo/client";
import {spellFromData} from "@/core/model/skill";

export const useChampionAttackAndSkills = (championName: string) => {
  const result = useQuery(ChampionDetail(championName), { fetchPolicy: 'no-cache', context: { clientName: ApiEndpoint.DATA_DRAGON }})

  if (result.error) {
    return null
  }

  if (result.loading) {
    return null
  }

  const rawData = result.data.championDetail.data[championName]
  const spells = rawData.spells as any[]
  const skills = spells.map((skill) => {
    return {
      type: 'skill',
      data: skill
    }
  })

  return [
      { type: 'attack' },
      { type: 'passive', data: rawData.passive },
      ...skills]
}
