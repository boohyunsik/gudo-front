import { makeVar, ReactiveVar } from '@apollo/client'
import {Pair} from "yaml/types";

export const RED_TEAM = 0
export const BLUE_TEAM = 1
export const selectedChampionSide: ReactiveVar<number> = makeVar(0)
export const selectedChampion: ReactiveVar<[string, string]> = makeVar(['null', 'null'])
