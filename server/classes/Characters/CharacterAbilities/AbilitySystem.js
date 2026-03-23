export class AbilitySystem {
    constructor(player) {
        this.player = player;
        this.abilities = {};
    }

    addAbility(abilityKey, ability) {
        this.abilities[abilityKey] = ability;
    }

    useAbility(abilityKey, params = {}) {
        if (!this.abilities[abilityKey]) {
            console.warn(`Ability ${abilityKey} not found`);
            return false;
        }
 
        return this.abilities[abilityKey].execute(this.player, params);
    }

    getAbilitiesInfo() {
        const info = {};
        for (const [key, ability] of Object.entries(this.abilities)) {
            info[key] = ability.getInfo();
        }
        return info;
    }

    update() {
        for (const ability of Object.values(this.abilities)) {
            if (ability.update) {
                ability.update(this.player);
            }
        }
    }
}