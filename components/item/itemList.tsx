import {useItem, useItemList} from "@/core/hooks/useItem";
import Image from "next/image";
import {LOL_VERSION} from "@/utils/config";
import {useReactiveVar} from "@apollo/client/react";
import {selectedChampionSide, selectedItemList} from "@/core/state/uiState";
import {Tooltip} from "@material-tailwind/react";

export const ItemList = () => {
    const itemList = useItemList()
    const currentSelectedSide = useReactiveVar(selectedChampionSide)
    const currentSelectedItem = useReactiveVar(selectedItemList)
    const { addItem } = useItem(currentSelectedSide)

    return (
        <div className="grid grid-cols-12 content-start gap-1">
            {
                itemList?.map((item, index) => {
                    return (
                        <Tooltip content={item.name} placement="bottom">
                            <Image
                                key={index}
                                className={`rounded-md border-4 cursor-pointer ${item.depth === 4 ? "border-orange-700" : "border-black"}`}
                                onClick={_ => addItem(item)}
                                src={`/ddragon/${LOL_VERSION}/img/item/${item.image.full}`}
                                width='64'
                                height='64'
                                alt={''}
                            />
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}