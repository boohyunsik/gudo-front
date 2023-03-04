import xxHash64 from 'crypto-xxhash-64'
import mustache from 'mustache'
import Handlebars from 'handlebars'
import {ChampionStats} from "@/core/model/champion";
import {useChampionBinJson} from "@/core/hooks/useCommunitydragon";
import {createTree} from "@/core/interpreter/tree";


export const createSkillCalculation = async (champion: ChampionStats) => {
    const bin = await useChampionBinJson(champion.name.toLowerCase())
    const skillTree = createTree(champion.name, bin?.passive, bin?.q, bin?.w, bin?.e, bin?.r)

}

export const interpretSkillDescription = async (dataDragonSpellData: any,
                                                cDragonChampionData: any,
                                                currentChampionSpec: any,
                                                skillLevel: number) => {
    console.log('############################## Start Interpreting! ##########################################')
    // 1. Find mSpellCalculations
    const tooltip: string = dataDragonSpellData.tooltip
    const item = cDragonChampionData.find((d: any) => d.mScriptName === dataDragonSpellData.id)
    const spellData = item.mSpell
    const dataValues = spellData.mSpellCalculations
    const keys = Object.keys(dataValues)
    const result: any = {}
    const dv: any[] = spellData.mDataValues
    dv.forEach((current) => {
        result[current.mName.toLowerCase()] = current.mValues[skillLevel]
    })

    keys.forEach((k) => {
        const data = dataValues[k]
        const dataKeyList = Object.keys(data)
        dataKeyList.forEach((dk) => {
            switch (dk) {
                case 'mMultiplier':
                    break
                case 'mFormulaParts':
                    const values = data[dk]
                    let damage = 0
                    values.forEach((v: any) => {
                        const type = v['__type']
                        switch (type) {
                            case 'ByCharLevelInterpolationCalculationPart':
                                const startValue = v.mStartValue
                                const endValue = v.mEndValue
                                const champLevel = currentChampionSpec.level

                                const increment = champLevel * (endValue - startValue) / 18
                                damage += (startValue + increment * (champLevel - 1))
                                break
                            case 'NamedDataValueCalculationPart':
                                // FIND VALUE IN mDataValues FIELD
                                const f = dv.find((d) => d.mName == v.mDataValue || v.mDataValue === getBinHash(d.mName))
                                if (f != null) {
                                    const calcResult = f.mValues[skillLevel]
                                    damage += calcResult
                                }
                                break
                            case 'StatByCoefficientCalculationPart':
                                const stat = currentChampionSpec[v.mStat || 'magic'][v.mStatFormula || 1]
                                const damageResult = stat * v.mCoefficient
                                damage += damageResult
                                break
                            case 'StatByNamedDataValueCalculationPart':
                                const find = dv.find((d) => d.mName == v.mDataValue || v.mDataValue === getBinHash(d.mName))
                                if (find != null) {
                                    if (v.mStat == null) {
                                        // magic
                                        damage += Math.round((find.mValues[skillLevel] * currentChampionSpec['magic'][v.mStatFormula || 1]))
                                    } else {
                                        damage += Math.round((find.mValues[skillLevel] * currentChampionSpec[v.mStat][v.mStatFormula]))
                                    }
                                }
                                break
                            case 'EffectValueCalculationPart':
                                const ea: any[] = spellData.mEffectAmount
                                const effectAmount = ea[parseInt(v.mEffectIndex) - 1].value[skillLevel]
                                damage += effectAmount
                                break
                            case 'AbilityResourceByCoefficientCalculationPart':
                                break
                        }
                    })
                    result[k.toLowerCase()] = damage.toFixed(0)
                    break
            }
        })
    })

    const effectAmount: any[] = spellData.mEffectAmount
    effectAmount?.forEach((v, index) => {
        if (v.value != null) {
            result[`e${index+1}`] = v.value[skillLevel]
        }
    })

    const tooltipKey = spellData.mClientData.mTooltipData.mLocKeys.keyTooltip.toLowerCase()
    interpretTooltip(tooltip, result)
}


// TODO: refactor
const keyword = [
    'physicalDamage',
    'healing',
    'keywordMajor'
]

export interface TooltipWrapper {
    tooltip: string
    type: string
}

export const getBinHash = (data: string) => {
    let h = BigInt(0x811c9dc5)
    const lower = data.toLowerCase()
    for (let i = 0; i < lower.length; i++) {
        let b = BigInt(lower.charCodeAt(i))
        h = ((h ^ b) * BigInt(0x01000193)) % BigInt(0x100000000)
    }
    return `{${h.toString(16)}}`
}

export const interpretTooltip = (tooltip: string, params: any) => {
    console.log(tooltip)
    const view: any = {
        basicdamage: 10
    }
    const r = mustache.render(tooltip, params)
    console.log('view', r)


    const result: TooltipWrapper[] = []
    let parsingStart = true
    let cachedType = ''
    let index = 0

}

export const keyToHash = async (key: string) => {
    await xxHash64.loadWASM()
    const r = xxHash64.hash(key.toLowerCase())
    console.log('oroginal tooltip key hash', r)
    return r.slice(6)
}