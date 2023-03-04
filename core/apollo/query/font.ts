import {gql} from "@apollo/client";

export const Font = gql`
    query Font {
        font @rest(type: "Font", path: "13.4/game/data/menu/main_ko_kr.stringtable.json") {
            entries
        }
    }
`