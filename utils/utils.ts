import {DDRAGON_REST_URL, LOL_VERSION} from "@/utils/config";

export const getSquareImageUrl = (imageName: string) => {
  if (imageName === "") {
    return "http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/588.png"
  }
  return `${DDRAGON_REST_URL}${LOL_VERSION}/img/champion/${imageName}`
}
