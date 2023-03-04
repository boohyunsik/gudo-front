import {useQuery} from "@apollo/client/react";
import {CdragonChampionBinJson, ChampionDetail} from "@/core/apollo/query/champion";
import {Champion2, ChampionSpec, ChampionStats, ChampionWrapper, StatFromData, Stats} from "@/core/model/champion";
import {ApiEndpoint} from "@/core/apollo/client";
import {
    useCommunityDragonChampionSpellInfo,
    useChampionBinJson,
    useCommunityDragonChampionSpec
} from "@/core/hooks/useCommunitydragon";
import {createSkillCalculation, interpretSkillDescription} from "@/core/interpreter/interpreter";
import {createTree, findItem, findItemByPath} from "@/core/interpreter/tree";
import {calculateChampionSpec} from "@/core/engine/specCalculator";

// Champion interface from api
export const useChampion = async (championId: string, championName: string, font: any) => {
    const c = await useCommunityDragonChampionSpec(championId)
    const stat: Stats | null = StatFromData(c)
    const spells = await useCommunityDragonChampionSpellInfo(championId, font)
    let tags: string[] = new Array<string>()
    if (c != null && c.characterToolData.searchTags != null) {
        tags.push(c.characterToolData.searchTags)

        const secondaryTags = c.characterToolData.searchTagsSecondary
        if (secondaryTags != null) {
            tags.push(secondaryTags)
        }
    }

    const ret = new ChampionWrapper()
    ret.champion = {
        name: championName,
        tags: tags,
        baseStat: stat,
        abilityResource: 0,
        spells: spells
    } as Champion2
    ret.stats = stat
    ret.level = 1
    ret.items = new Array<any>()
    ret.buffs = new Array<any>()

    return ret
}

export const useChampionSpec = (championName: string) => {
    const result = useQuery(ChampionDetail(championName), { fetchPolicy: 'no-cache', context: { clientName: ApiEndpoint.DATA_DRAGON } })
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
