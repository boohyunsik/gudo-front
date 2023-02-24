import {useQuery} from "@apollo/client/react";
import {ItemList} from "@/core/apollo/query/item";
import {Item} from "@/core/model/item";

export const useItemList = () => {
    const result = useQuery(ItemList)

    if (!result.loading) {
        const data = result.data.item.data
        return Object.keys(data).map((itemIndex) => {
            return {
                id: itemIndex,
                ...data[itemIndex]
            }
        }) as Item[]
    }
}