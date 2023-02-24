import * as React from 'react';
import { ItemList } from './itemList';
import {SelectedItem} from "@/components/item/selectedItem";
import {BLUE_TEAM, RED_TEAM} from "@/core/state/uiState";

export interface Props {

}

export const ItemSelectHolder = ({}: Props) => {
    return (
        <div className="flex justify-between h-96">
            <div className="basis-2/12">
                <SelectedItem side={RED_TEAM} />
            </div>
            <div className="basis-6/12 h-96 overflow-y-auto">
                <ItemList />
            </div>
            <div className="basis-2/12">
                <SelectedItem side={BLUE_TEAM} />
            </div>
        </div>
    )
}