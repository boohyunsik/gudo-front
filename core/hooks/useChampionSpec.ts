import {useQuery} from "@apollo/client/react";
import {ChampionDetail} from "@/core/apollo/query/champion";
import {ChampionSpec} from "@/core/model/champion";

export const useChampionSpec = (championName: string) => {
    const result = useQuery(ChampionDetail(championName), { fetchPolicy: 'no-cache' })
    if (result.error || result.loading) {
        return null
    }

    const stats = result.data.championDetail.data[championName].stats
    return {
        armor: stats.armor || 0,
        armorPerLevel: stats.armorperlevel  || 0,
        attackDamage: stats.attackdamage  || 0,
        attackDamagePerLevel: stats.attackdamageperlevel || 0,
        attackRange: stats.attackrange || 0,
        attackSpeed: stats.attackspeed || 0,
        attackSpeedPerLevel: stats.attackspeedperlevel || 0,
        crit: stats.crit || 0,
        critPerLevel: stats.critperlevel || 0,
        hp: stats.hp || 0,
        hpPerLevel: stats.hpperlevel || 0,
        hpRegen: stats.hpregen || 0,
        hpRegenPerLevel: stats.hpregenperlevel || 0,
        moveSpeed: stats.movespeed || 0,
        mp: stats.mp || 0,
        mpPerLevel: stats.mpperlevel || 0,
        mpRegen: stats.mpregen || 0,
        spellBlock: stats.spellblock || 0,
        spellBlockPerLevel: stats.spellblockperlevel || 0,
    } as ChampionSpec
}
