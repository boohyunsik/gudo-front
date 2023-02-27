import {useQuery, useReactiveVar} from "@apollo/client/react";
import {ItemList} from "@/core/apollo/query/item";
import {Item} from "@/core/model/item";
import {selectedItemList} from "@/core/state/uiState";
import {ApiEndpoint} from "@/core/apollo/client";

export const useItemList = () => {
    const result = useQuery(ItemList, { context: { clientName: ApiEndpoint.DATA_DRAGON } })

    if (!result.loading) {
        const data = result.data.item.data
        return Object.keys(data)
            .filter((itemIndex) => data[itemIndex].colloq !== "")
            .map((itemIndex) => {
                return {
                    id: itemIndex,
                    ...data[itemIndex]
                }
        }) as Item[]
    }
}

export const useItem = (team: number) => {
    const currentSelectedItem = useReactiveVar(selectedItemList)

    const addItem = (item: Item) => {
        console.log(item)
        if (currentSelectedItem[team].length === 6) {
            return
        }

        currentSelectedItem[team].push(item)
        selectedItemList([...currentSelectedItem])
    }

    const subItem = (index: number) => {
        currentSelectedItem[team].splice(index, 1)
        selectedItemList([...currentSelectedItem])
    }

    return {
        selectedItems: currentSelectedItem[team],
        addItem,
        subItem
    }
}