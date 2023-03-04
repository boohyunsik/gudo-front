import { makeVar, ReactiveVar } from '@apollo/client'
import {Champion, ChampionSpec, ChampionWrapper, OptionalChampion} from "@/core/model/champion";
import {Item} from "@/core/model/item";

export const RED_TEAM = 0
export const BLUE_TEAM = 1
export const selectedChampionSide: ReactiveVar<number> = makeVar(0)
export const selectedChampion: ReactiveVar<OptionalChampion[]> = makeVar<OptionalChampion[]>([null, null])
export const selectedSkillList: ReactiveVar<any[]> = makeVar([[], []])

export const selectedLevel: ReactiveVar<any[]> = makeVar([1, 1])
export const selectedChampionStats: ReactiveVar<any[]> = makeVar([null, null])

export const selectedItemList: ReactiveVar<Array<Array<Partial<Item | null>>>> = makeVar<Array<Array<Partial<Item | null>>>>([[], []])

export const fontConfig: ReactiveVar<any> = makeVar<any>(null)
export const selectedChampionStatFormula: ReactiveVar<any[]> = makeVar<any>([null, null])

export const championWrapperState: ReactiveVar<ChampionWrapper[]> = makeVar<ChampionWrapper[]>([])