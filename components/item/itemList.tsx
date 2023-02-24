import {useItemList} from "@/core/hooks/useItemList";
import Image from "next/image";
import {LOL_VERSION} from "@/utils/config";
import {useReactiveVar} from "@apollo/client/react";
import {selectedChampionSide, selectedItemList} from "@/core/state/uiState";

export const ItemList = () => {
    const itemList = useItemList()
    const currentSelectedSide = useReactiveVar(selectedChampionSide)
    const currentSelectedItem = useReactiveVar(selectedItemList)

    const onClickItem = (e: any, item: any) => {
        currentSelectedItem[currentSelectedSide].push(item)
        selectedItemList([...currentSelectedItem])
        console.log('item', currentSelectedItem)
    }

    return (
        <div className="grid grid-cols-12 content-start gap-2">
            {
                itemList?.map((item) => {
                    return (
                        <Image
                            className="rounded-md border-4 border-black cursor-pointer"
                            onClick={e => onClickItem(e, item)}
                            src={`/ddragon/${LOL_VERSION}/img/item/${item.image.full}`}
                            width='48'
                            height='48'
                            alt={''}
                        />
                    )
                })
            }
        </div>
    )
}