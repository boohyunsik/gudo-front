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
