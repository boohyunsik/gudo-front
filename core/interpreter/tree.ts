export interface Tree {
    spell: any
}

export const createTree = (championName: string, passive: any, q: any, w: any, e: any, r: any) => {
    const root: Tree = {
        spell: {

        }
    }

    root['spell'][`${championName.toLowerCase()}q`] = q
    root['spell'][`${championName.toLowerCase()}w`] = w
    root['spell'][`${championName.toLowerCase()}e`] = e
    root['spell'][`${championName.toLowerCase()}r`] = r
    return root
}

// spell -> champ_name+q/w/e/r -> data name

export const findItem = (tree: Tree, championName: string, targetSkill: string, targetDataKey: string) => {
    const targetChild: any[] = tree.spell[`${championName.toLowerCase()}${targetSkill}`]
    let result: any = {}
    targetChild?.forEach((c) => {
        c.mSpell?.mDataValues?.forEach((c2: any) => {
            if (c2.mName.toLowerCase() === targetDataKey.toLowerCase()) {
                result = c2
            }
        })
    })

    return result
}

export const findItemByPath = (tree: Tree, path: string) => {
    // path = spell.ryzer.overloaddamagebonus
    const splitPath = path.split('.')
    const championName = splitPath[1].slice(0, splitPath[1].length - 1)
    const skill = splitPath[1].slice(splitPath[1].length - 1, splitPath[1].length)
    return findItem(tree, championName, skill, splitPath[2])
}