import {useQuery} from "@apollo/client/react";
import {ChampionDetail} from "@/core/apollo/query/champion";

export const useChampionAttackAndSkills = (championName: string) => {
  const result = useQuery(ChampionDetail(championName), { fetchPolicy: 'no-cache' })

  if (result.error) {
    return null
  }

  if (result.loading) {
    return null
  }

  const rawData = result.data.championDetail.data[championName].spells as any[]
  const skills = rawData.map((skill) => {
    return {
      type: 'skill',
      data: skill
    }
  })

  return [{ type: 'attack' }, ...skills]
}
