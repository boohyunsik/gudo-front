import {Item} from "@/core/model/item";

export enum Spec {
    HP = 'hp',
    MP = 'mp',
    ATTACK = 'attack',
    MAGIC = 'magic',
    ARMOR = 'armor',
    SPELL_BLOCK = 'spellBlock',
}

export const calculateSpec = (initialValue: number, weight: number, level: number, itemList: Partial<Item | null>[], category: Spec) => {
    let levelValue = (initialValue + weight * (level - 1))
    let itemAddedValue = 0
    switch (category) {
        case Spec.HP:
            itemAddedValue = iterateItemListAndCalcStats(itemList, ['FlatHPPoolMod'])
            break

        case Spec.MP:
            itemAddedValue = iterateItemListAndCalcStats(itemList, ['FlatMPPoolMod'])
            break

        case Spec.ATTACK:
            itemAddedValue = iterateItemListAndCalcStats(itemList, ['FlatPhysicalDamageMod'])
            break

        case Spec.MAGIC:
            itemAddedValue = iterateItemListAndCalcStats(itemList, ['FlatMagicDamageMod'])
            break

        case Spec.ARMOR:
            itemAddedValue = iterateItemListAndCalcStats(itemList, ['FlatArmorMod'])
            break

        case Spec.SPELL_BLOCK:
            itemAddedValue = iterateItemListAndCalcStats(itemList, ['FlatSpellBlockMod'])
            break

        default:
            break
    }

    return (levelValue + itemAddedValue).toFixed(1)
}

const iterateItemListAndCalcStats = (itemList: Partial<Item | null>[], wantToFind: string[]) => {
    let value = 0
    itemList.forEach((item) => {
        wantToFind.forEach((key) => {
            if (item?.stats[key] != null) {
                value += item?.stats[key]
            }
        })
    })
    return value
}