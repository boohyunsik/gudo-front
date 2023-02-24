
export interface Item {
    id: string
    name: string
    description: string
    gold: {
        base: number
        purchasable: boolean
        total: number
        sell: number
    }
    into: string[]
    plaintext: string
    stats: any
    tags: string[]
    image: {
        full: string
        group: string
        h: number
        sprite: string
        w: number
    }
}