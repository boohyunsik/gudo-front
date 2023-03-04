import {useQuery} from "@apollo/client/react";
import {Font} from "@/core/apollo/query/font";
import {ApiEndpoint} from "@/core/apollo/client";
import {fontConfig} from "@/core/state/uiState";


export const useFontConfig = () => {
    const font = useQuery(Font, { fetchPolicy: 'no-cache', context: { clientName: ApiEndpoint.COMMUNITY_DRAGON } })
    if (font.loading || font.error) {
        return null
    }

    fontConfig(font.data.font.entries)
    return font
}