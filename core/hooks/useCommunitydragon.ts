import {useChampionAttackAndSkills} from "@/core/hooks/useChampionAttackAndSkills";
import {DataValue, Spell} from "@/core/model/skill";
import {DamageType, HardCC, PartialCC} from "@/core/interpreter/constants";
import {keyToHash} from "@/core/interpreter/interpreter";
import {GameCalculation} from "@/core/interpreter/calculation/gameCalculation";
import {ParsingContext} from "@/core/model/champion";
import {useQuery} from "@apollo/client/react";
import {CdragonChampionBinJson} from "@/core/apollo/query/champion";
import {ApiEndpoint} from "@/core/apollo/client";

export interface SkillParam {
    q: any
    w: any
    e: any
    r: any
    passive: any
}

const getTooltipFromFontConfig = async (key: string, font: any) => {
    if (key == null) {
        return null
    }

    let result = font[key]
    if (result != null) {
        return result
    }

    const hashKey = await keyToHash(key)
    result = font[hashKey]
    if (result != null) {
        return result
    }

    return null
}

export const useCommunityDragonChampionSpec = async (championId: string) => {
    if (championId == null || championId === '') {
        return null
    }

    const url = `https://raw.communitydragon.org/13.4/game/data/characters/${championId.toLowerCase()}/${championId.toLowerCase()}.bin.json`
    const result = await fetch(url)
    const json = await result.json()

    console.log('json', json)

    return json[`Characters/${championId}/CharacterRecords/Root`]

}

export const useCommunityDragonChampionSpellInfo = async (championId: string, font: any) => {
    if (championId == null || championId === '') {
        return null
    }

    const url = `https://raw.communitydragon.org/13.4/game/data/characters/${championId.toLowerCase()}/${championId.toLowerCase()}.bin.json`
    const result = await fetch(url)
    const json = await result.json()

    const championDataKeyList = Object.keys(json).filter((key) => key.includes('Spells'))

    // construct spell list (TODO: divide to function)
    const spellList: Spell[] = []
    for (const key of championDataKeyList) {
        const item = json[key]
        if (item.mSpell == null) {
            continue;
        }

        const spell: Spell = {
            name: item.mScriptName || null,
            tags: item.mSpell.mSpellTags || null,
            coefficient: item.mSpell.mCoefficient || null,
            castTime: item.mSpell.mCastTime || null,
            coolDownTime: item.mSpell.mCooldownTime || null,
            delayCaseOffsetPercent: item.mSpell.mDelayCastOffsetPercent || null,
            delayTotalTimePercent: item.mSpell.mDelayTotalTimePercent || null,
            castRange: item.mSpell.mCastRange || null,
            castRadius: item.mSpell.mCastRadius || null,
            damageType: new Array<DamageType>(),
            CC: new Array<string>(),
            partialCC: new Array<string>(),
            effectAmounts: new Array<Array<number>>(),
            spellCalculations: new Array<any>()
        } as Spell

        const tooltip = await getTooltipFromFontConfig(item.mSpell?.mClientData?.mTooltipData?.mLocKeys?.keyTooltip?.toLowerCase(), font)
        if (tooltip != null) {
            spell.tooltip = tooltip

            if (tooltip.includes('physicalDamage')) {
                spell.damageType.push(DamageType.Physical)
            }

            if (tooltip.includes('magicDamage')) {
                spell.damageType.push(DamageType.Magic)
            }

            if (tooltip.includes('trueDamage')) {
                spell.damageType.push(DamageType.True)
            }

            for (const cc of HardCC) {
                if (tooltip.includes(`<status>${cc}`)) {
                    spell.CC.push(cc)
                }
            }

            for (const cc of PartialCC) {
                if (tooltip.includes(`<status>${cc}`)) {
                    spell.partialCC.push(cc)
                }
            }
        }

        const effectAmount = item.mSpell?.mEffectAmount
        if (effectAmount != null) {
           for (const value of effectAmount) {
               spell.effectAmounts.push(value)
           }
        }

        const dataValues = item.mSpell?.mDataValues
        if (dataValues != null) {
            spell.dataValues = new Map<string, DataValue>()
            for (const value of dataValues) {
                const dv = {} as DataValue
                dv.values = value.mValues
                dv.baseValue = value.mBaseP
                if (value.mFormula == '' || value.mFormula == 'P') {
                    spell.dataValues.set(value.mName, dv)
                    continue
                }

                dv.formula = value.mFormula
                spell.dataValues.set(value.mName, dv)
            }
        }

        const parsingCtx = {
            apiSpell: spell,
            dataValues: spell.dataValues
        } as ParsingContext

        const spellCalculation = item.mSpell?.mSpellCalculations
        if (spellCalculation != null) {
            const keys = Object.keys(spellCalculation)
            for (const key of keys) {
                const spellCalcItem = spellCalculation[key]
                const type = spellCalcItem['__type']
                let gc: GameCalculation | null = null
                switch (type) {
                    case 'GameCalculation':
                        gc = new GameCalculation()
                        break
                    case 'GameCalculationModified':
                        // Not supported
                        break
                }
                if (gc == null) {
                    continue
                }
                gc.fromJson(key, spellCalcItem, parsingCtx)
                spell.spellCalculations.push(gc)
            }
        }

        spellList.push(spell)
    }

    return spellList
}

export const useChampionBinJson = async (championId: string) => {
    if (championId == null || championId === '') {
        return null
    }

    const smallLetterChampionId = championId.toLowerCase()
    const skillDetail = useChampionAttackAndSkills(championId)
    const url = `https://raw.communitydragon.org/13.4/game/data/characters/${smallLetterChampionId}/${smallLetterChampionId}.bin.json`
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
                break
            case 'passive':
                const spells: any[] = json[skillKeys[4]]['mChildSpells']
                const c2: any[] = []
                spells.forEach((item) => {
                    c2.push(json[item])
                })
                ret.passive = c2
                break
        }
    })

    return ret
}