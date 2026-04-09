import { Ability } from "../Ability.js";

export class ForwardDash extends Ability {
    constructor() {
        super("forward_dash", 8000);
        this.duration = 0;
        this.launchForce = -50.0;
        this.damageAmount = 25;
        this.dashRange = 10; 
    }

    execute(player, params = {}) {
        if (!super.execute(player, params)) return false;

        const dashImpulse = {
            x: Math.sin(player.rotation) * this.launchForce,
            y: 0.5,
            z: Math.cos(player.rotation) * this.launchForce
        }

        player.body.applyImpulse(dashImpulse, true);

        // Check for enemies in dash range
        this.checkForEnemiesHit(player);

        player.socket.emit("ability_activated", {
            ability: "forward_dash",
            duration: this.duration,
        });

        return true;
    }

    /**
     * Check for enemies in dash range using distance-based detection
     */
    checkForEnemiesHit(player) {
        const playerPos = player.body.translation();
        const dashDirX = Math.sin(player.rotation);
        const dashDirZ = Math.cos(player.rotation);

        Object.values(player.game.players).forEach(otherPlayer => {
            if (!otherPlayer || otherPlayer === player || otherPlayer.damageSystem.isDead) {
                return;
            }

            const otherPos = otherPlayer.body.translation();
            
            // Calculate distance between players
            const dx = otherPos.x - playerPos.x;
            const dy = otherPos.y - playerPos.y;
            const dz = otherPos.z - playerPos.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // Check if in range and in front of dash direction
            if (distance < this.dashRange && distance > 0) {
                // Dot product: is target in front of dash direction?
                const dotProduct = (dx * dashDirX + dz * dashDirZ);
                
                if (dotProduct > 0) {
                    otherPlayer.takeDamage(this.damageAmount, player);
                }
            }
        });
    }
}