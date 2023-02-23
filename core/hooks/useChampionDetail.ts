import {useQuery} from "@apollo/client/react";
import {ChampionDetail} from "@/core/apollo/query/champion";

export const useChampionDetail = (championName: string) => {
  const result = useQuery(ChampionDetail(championName), { fetchPolicy: 'no-cache' })
  // if (result.error) {
  //   return null
  // }
  //
  // if (!result.loading) {
  //   return result.data.championDetail.data[championName]
  // }

  const getPassive = () => {
    if (result.error) {
      return null
    }

    if (!result.loading) {
      return result.data.championDetail.data[championName]
    }

    const rawData = result.data.championDetail.data[championName].passive as any
    return {
      type: 'passive',
      data: rawData
    }
  }

  const getSkills = () => {
    if (result.error) {
      return null
    }

    if (result.loading) {
      return null
    }

    console.log('result', result)

    const rawData = result.data.championDetail.data[championName].spells as any[]
    return rawData.map((skill) => {
      return {
        type: 'skill',
        data: skill
      }
    })
  }

  return {
    getPassive,
    getSkills,
  }
}
