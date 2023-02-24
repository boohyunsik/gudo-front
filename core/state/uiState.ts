import { makeVar, ReactiveVar } from '@apollo/client'
import {Champion, ChampionSpec} from "@/core/model/champion";

export const RED_TEAM = 0
export const BLUE_TEAM = 1
export const selectedChampionSide: ReactiveVar<number> = makeVar(0)
export const selectedChampion: ReactiveVar<Partial<Champion>[]> = makeVar([{}, {}])
export const selectedSkillList: ReactiveVar<any> = makeVar([[], []])

export const selectedLevel: ReactiveVar<any[]> = makeVar([0, 0])
export const selectedChampionStats: ReactiveVar<any[]> = makeVar([null, null])