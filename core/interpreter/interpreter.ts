import xxHash64 from 'crypto-xxhash-64';

export const interpretSkillDescription = (original: any, data: any) => {
    fetch('https://raw.communitydragon.org/13.4/game/data/menu/main_ko_kr.stringtable.json').then((tootips) => {
        console.log('originalTooltip', original)
        console.log('data', data)

        // 1. Find mSpellCalculations
        const tooltip: string = original.tooltip
        console.log('tooltip', tooltip)
        const item = data.find((d: any) => d.mScriptName === original.id)
        console.log('item', item)
        const spellCalculations = item.mSpell.mSpellCalculations
        console.log('mSpell', spellCalculations)
        // console.log('spellCalculations', spellCalculations)

        const split = tooltip.split(new RegExp('<|</|>'))
        console.log('split', split)

        keyToHash('')
    })
}

export const keyToHash = async (key: string) => {
    await xxHash64.loadWASM()
    const r = xxHash64.hash(key.toLowerCase())
    console.log(r.slice(6))
}