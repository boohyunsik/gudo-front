import { makeVar, ReactiveVar } from '@apollo/client'
import {Champion, ChampionSpec, OptionalChampion} from "@/core/model/champion";

export const RED_TEAM = 0
export const BLUE_TEAM = 1
export const selectedChampionSide: ReactiveVar<number> = makeVar(0)
export const selectedChampion: ReactiveVar<OptionalChampion[]> = makeVar<OptionalChampion[]>([null, null])
export const selectedSkillList: ReactiveVar<any> = makeVar([[], []])

export const selectedLevel: ReactiveVar<any[]> = makeVar([1, 1])
export const selectedChampionStats: ReactiveVar<any[]> = makeVar([null, null])
