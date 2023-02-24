import {useReactiveVar} from "@apollo/client/react";
import {selectedItemList} from "@/core/state/uiState";
import Image from "next/image";
import {LOL_VERSION} from "@/utils/config";

export interface Props {
    side: number
}

export const SelectedItem = ({ side }: Props) => {
    const currentSelectedItemList = useReactiveVar(selectedItemList)

    const onClickItem = (e: any, index: number) => {
        currentSelectedItemList[side].splice(index, 1)
        selectedItemList([...currentSelectedItemList])
    }

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {
                currentSelectedItemList[side].map((item, index) => {
                    return (
                        <Image
                            className="rounded-md border-4 border-black cursor-pointer"
                            onClick={e => onClickItem(e, index)}
                            src={`/ddragon/${LOL_VERSION}/img/item/${item?.image?.full}`}
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