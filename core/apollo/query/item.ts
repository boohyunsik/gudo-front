import { gql } from "@apollo/client";

export const ItemList = gql`
    query Item {
        item @rest(type: "Item", path: "13.3.1/data/ko_KR/item.json") {
            version
            data
        }
    }
`