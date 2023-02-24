import { gql } from "@apollo/client";

export const ChampionList = gql`
  query Champion {
    champion @rest(type: "Champion", path: "13.3.1/data/ko_KR/champion.json") {
      version
      data
    }
  }
`

export const ChampionDetail = (championName: string) => gql`
  query ChampionDetail {
    championDetail @rest(type: "ChampionDetail", path: "13.3.1/data/ko_KR/champion/${championName}.json") {
      version
      data
    }
  }
`
