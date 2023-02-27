import {useReactiveVar} from "@apollo/client/react";
import {selectedItemList} from "@/core/state/uiState";
import Image from "next/image";
import {LOL_VERSION} from "@/utils/config";
import {useItem} from "@/core/hooks/useItem";
import {Tooltip} from "@material-tailwind/react";

export interface Props {
    side: number
}

export const SelectedItem = ({ side }: Props) => {
    const { selectedItems, subItem } = useItem(side)

    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {
                selectedItems.map((item, index) => {
                    return (
                        <Tooltip content={item?.name} placement="bottom">
                            <Image
                                key={index}
                                className="rounded-md border-4 border-black cursor-pointer"
                                onClick={e => subItem(index)}
                                src={`/ddragon/${LOL_VERSION}/img/item/${item?.image?.full}`}
                                width='48'
                                height='48'
                                alt={''}

                            />
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}