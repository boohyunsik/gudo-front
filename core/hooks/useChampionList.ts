import {useQuery} from "@apollo/client/react";
import {ChampionList} from "@/core/apollo/query/champion";
import {Champion} from "@/core/model/champion";
import {ApiEndpoint} from "@/core/apollo/client";

export const useChampionList = () => {
  const result = useQuery(ChampionList, { context: { clientName: ApiEndpoint.DATA_DRAGON } })

  if (!result.loading) {
    const data = result.data.champion.data
    return Object.keys(data).map((championName) => {
      const raw = data[championName]
      return {
        key: raw.key,
        id: raw.id,
        name: raw.name,
        image: {
          full: raw.image.full,
          sprite: raw.image.sprite,
        },
        stats: {
          hp: raw.stats.hp,
          hpPerLevel: raw.stats.hpperlevel,
          mp: raw.stats.mp,
          mpPerLevel: raw.stats.mpperlevel,
          moveSpeed: raw.stats.movespeed,
          armor: raw.stats.armor,
          armorPerLevel: raw.stats.armorperlevel,
          spellBlock: raw.stats.spellblock,
          spellBlockPerLevel: raw.stats.spellblockperlevel,
          attackRange: raw.stats.attacrange,
          hpRegen: raw.stats.hpregen,
          hpRegenPerLevel: raw.stats.hpregenperlevel,
          mpRegen: raw.stats.mpRegen,
          mpRegenPerLevel: raw.stats.mpregenperlevel,
          crit: raw.stats.crit,
          critPerLevel: raw.stats.critperlevel,
          attackDamage: raw.stats.attackdamage,
          attackDamagePerLevel: raw.stats.attackdamageperlevel,
          attackSpeedPerLevel: raw.stats.attackspeedperlevel,
          attackSpeed: raw.stats.attackspeed
        }
      }
    }).sort((a: Champion, b: Champion) => {
      if (a.name >= b.name) {
        return 1
      }
      return -1
    })
  } else {
    return null
  }
}
