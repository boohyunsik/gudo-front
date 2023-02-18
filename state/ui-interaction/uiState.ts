import { makeVar, ReactiveVar } from '@apollo/client'

export const RED_TEAM = 0
export const BLUE_TEAM = 1

export const selectedChampionSide: ReactiveVar<number> = makeVar(0)