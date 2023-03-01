import {useChampionAttackAndSkills} from "@/core/hooks/useChampionAttackAndSkills";

export interface SkillParam {
    q: any
    w: any
    e: any
    r: any
    passive: any
}

export const useChampionBinJson = async (championId: string) => {
    const smallLetterChampionId = championId.toLowerCase()
    const skillDetail = useChampionAttackAndSkills(championId)
    console.log('skillDetail', skillDetail)
    const url = `https://raw.communitydragon.org/13.4/game/data/characters/${smallLetterChampionId}/${smallLetterChampionId}.bin.json`
    fetch(url).then(r => r.json()).then(json => {
        // console.log(json)
    })

    const result = await fetch(url)
    const json = await result.json()
    const root = json[`Characters/${championId}/CharacterRecords/Root`]
    const passiveKey = root['mCharacterPassiveSpell']
    const skillKeys: string[] = root['mAbilities']
    const ret: SkillParam = {
        q: null,
        w: null,
        e: null,
        r: null,
        passive: null
    }
    skillDetail?.forEach((s, index: number) => {
        switch (s.type) {
            case 'skill':
                const filtered = skillKeys.filter((key) => key.includes(s.data.id))
                const children: any[] = []
                json[filtered[0]]['mChildSpells'].forEach((s: string) => {
                    children.push(json[s])
                })

                switch (index) {
                    case 2:
                        ret.q = children
                        break
                    case 3:
                        ret.w = children
                        break
                    case 4:
                        ret.e = children
                        break
                    case 5:
                        ret.r = children
                        break
                    default:
                        break
                }
            case 'passive':
                const r = json[skillKeys[4]]
                // console.log('passive skill', r)
                break
        }
    })

    console.log('ret', ret)
    return ret
}