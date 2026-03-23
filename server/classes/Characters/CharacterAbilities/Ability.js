export class Ability {
    constructor(name, cooldown = 5000) {
        this.name = name;
        this.cooldown = cooldown;
        this.lastUsed = 0;
        this.isActive = false;
    }

    isReady() {
        return Date.now() - this.lastUsed >= this.cooldown;
    }

    execute(player, params = {}) {
        if (!this.isReady()) {
            console.log(`${this.name} is on cooldown for ${this.cooldown - (Date.now() - this.lastUsed)}ms`);
            return false;
        }
 
        this.lastUsed = Date.now();
        this.isActive = true;
        return true;
    }
 
    /**
     * Ability info for client
     */
    getInfo() {
        const timeLeft = Math.max(0, this.cooldown - (Date.now() - this.lastUsed));
        return {
            name: this.name,
            cooldown: this.cooldown,
            timeLeft,
            isReady: this.isReady()
        };
    }
}