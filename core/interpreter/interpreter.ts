import xxHash64 from 'crypto-xxhash-64'
import mustache from 'mustache'
import Handlebars from 'handlebars'

export const interpretSkillDescription = async (dataDragonSpellData: any,
                                                cDragonChampionData: any,
                                                currentChampionSpec: any,
                                                skillLevel: number) => {
    // console.log('originalTooltip', dataDragonSpellData)
    // console.log('data', cDragonChampionData)

    // 1. Find mSpellCalculations
    const tooltip: string = dataDragonSpellData.tooltip
    console.log('tooltip', tooltip)
    const item = cDragonChampionData.find((d: any) => d.mScriptName === dataDragonSpellData.id)
    console.log('item', item)
    const spellData = item.mSpell
    console.log('mSpell', spellData)

    const dataValues = spellData.mSpellCalculations
    console.log('dataValues', dataValues)
    const keys = Object.keys(dataValues)
    const result: any = {}
    const dv: any[] = spellData.mDataValues

    keys.forEach((k) => {
        console.log('k', k)
        const data = dataValues[k]
        console.log('data', data)
        const dataKeyList = Object.keys(data)
        dataKeyList.forEach((dk) => {
            console.log('dk', dk)
            switch (dk) {
                case 'mFormulaParts':
                    console.log('value', data[dk])
                    const values = data[dk]
                    let damage = 0
                    values.forEach((v: any) => {
                        console.log('value2', v['__type'])
                        const type = v['__type']
                        switch (type) {
                            case 'NamedDataValueCalculationPart':
                                console.log('NamedDataValueCalculationPart', v.mDataValue)
                                // FIND VALUE IN mDataValues FIELD
                                console.log('dv', dv)
                                console.log('find', v.mDataValue)
                                const f = dv.find((d) => d.mName == v.mDataValue || v.mDataValue === getBinHash(d.mName))
                                if (f != null) {
                                    console.log('f', f)
                                    const calcResult = f.mValues[skillLevel]
                                    console.log('calcResult', calcResult)
                                    damage += calcResult
                                }
                                break
                            case 'StatByCoefficientCalculationPart':
                                console.log('StatByCoefficientCalculationPart, stat', v.mStat)
                                console.log('StatByCoefficientCalculationPart, coeffi', v.mCoefficient)
                                const stat = currentChampionSpec[v.mStat][v.mStatFormula || 1]
                                const damageResult = stat * v.mCoefficient
                                damage += damageResult
                                console.log('calcResult of StatByCoefficientCalculationPart', damageResult)
                                break
                            case 'StatByNamedDataValueCalculationPart':
                                console.log('StatByNamedDataValueCalculationPart', v.mStat)
                                const find = dv.find((d) => d.mName == v.mDataValue || v.mDataValue === getBinHash(d.mName))
                                console.log("StatByNamedDataValueCalculationPart, find", find)
                                console.log("StatByNamedDataValueCalculationPart, v", v)
                                if (find != null) {
                                    if (v.mStat == null) {
                                        // magic
                                        damage += Math.round((find.mValues[skillLevel] * currentChampionSpec['magic']))
                                    } else {
                                        damage += Math.round((find.mValues[skillLevel] * currentChampionSpec[v.mStat][v.mStatFormula]))
                                    }
                                }
                                break
                            case 'EffectValueCalculationPart':
                                console.log('EffectValueCalculationPart', v.mStat)
                                const ea: any[] = spellData.mEffectAmount
                                console.log('ea', ea)
                                console.log('effectIndex', v.mEffectIndex)
                                const effectAmount = ea[parseInt(v.mEffectIndex) - 1].value[skillLevel]
                                console.log('effectAmount', effectAmount)
                                damage += effectAmount
                                break
                        }
                    })
                    result[k.toLowerCase()] = damage.toFixed(0)
                    break
            }
        })
    })

    const mDataValue: any[] = spellData.mEffectAmount
    mDataValue.forEach((v, index) => {
        if (v.value != null) {
            result[`e${index+1}`] = v.value[skillLevel]
        }
    })

    const tooltipKey = spellData.mClientData.mTooltipData.mLocKeys.keyTooltip.toLowerCase()
    console.log('tooltipKey', tooltipKey)
    console.log('result', result)

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

const getBinHash = (data: string) => {
    let h = BigInt(0x811c9dc5)
    const lower = data.toLowerCase()
    for (let i = 0; i < lower.length; i++) {
        let b = BigInt(lower.charCodeAt(i))
        h = ((h ^ b) * BigInt(0x01000193)) % BigInt(0x100000000)
    }
    console.log('getBinHash: ', `{${h.toString(16)}}`)
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