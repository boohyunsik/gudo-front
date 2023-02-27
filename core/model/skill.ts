export interface Skill {
    id: string
    description: string
    name: string
    cost: number[]
    costBurn: string
    costType: string
    image: {
        full: string
        group: string
        h: number
        w: number
        sprite: string
    }
    tooltip: string
}