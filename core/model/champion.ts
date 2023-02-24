export type Champion = {
  key: string
  id: string
  name: string
  image: {
    full: string
    sprite: string
  }
  stats: {
    hp: string
    hpPerLevel: string
    mp: string
    mpPerLevel: string
    moveSpeed: string
    armor: string
    armorPerLevel: string
    spellBlock: string
    spellBlockPerLevel: string
    attackRange: string
    hpRegen: string
    hpRegenPerLevel: string
    mpRegen: string
    mpRegenPerLevel: string
    crit: string
    critPerLevel: string
    attackDamage: string
    attackDamagePerLevel: string
    attackSpeedPerLevel: string
    attackSpeed: string
  }
}

export type ChampionSpec = {
  armor: number
  armorPerLevel: number
  attackDamage: number
  attackDamagePerLevel: number
  attackRange: number
  attackSpeed: number
  attackSpeedPerLevel: number
  crit: number
  critPerLevel: number
  hp: number
  hpPerLevel: number
  hpRegen: number
  hpRegenPerLevel: number
  moveSpeed: number
  mp: number
  mpPerLevel: number
  mpRegen: number
  mpRegenPerLevel: number
  spellBlock: number
  spellBlockPerLevel: number
}