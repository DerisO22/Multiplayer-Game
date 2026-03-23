import { Ability } from "../Ability.js";

export class SprintAbility extends Ability {
    constructor() {
        super("Sprint", 4000);
        this.duration = 5000;

        this.sprintMultiplier = 2;
        this.endTime = null;
        this.originalMovespeed = null;
    }

    execute(player, params = {}) {
        if(!super.execute(player, params)) return false;

        this.originalMovespeed = { ...player.movespeed };

        player.movespeed.x *= this.sprintMultiplier;
        player.movespeed.z *= this.sprintMultiplier;

        this.endTime = Date.now() + this.duration;

        player.socket.emit("ability_activated", {
            ability: "sprint",
            duration: this.duration
        });

        return true;
    }

    update(player) {
        // Check if sprint duration is over
        if (this.isActive && Date.now() >= this.endTime) {
            this.deactivate(player);
        }
    }
 
    deactivate(player) {
        if (player && this.originalMovespeed) {
            player.movespeed = this.originalMovespeed;
        }
        this.isActive = false;
    }
}