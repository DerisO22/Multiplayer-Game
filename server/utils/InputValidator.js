export class InputValidator {
    static validateChatMessage(text) {
        // Check null/undefined
        if (!text || typeof text !== 'string') {
            return { valid: false, error: "Message must be a string" };
        }

        // Trim and check length
        const trimmed = text.trim();
        if (trimmed.length === 0) {
            return { valid: false, error: "Message cannot be empty" };
        }

        if (trimmed.length > 200) {
            return { valid: false, error: "Message too long (max 200 characters)" };
        }

        return { valid: true, message: trimmed };
    }

    static validateButton(button, value) {
        const VALID_BUTTONS = ['forward', 'backward', 'left', 'right', 'jump'];
        
        if (!VALID_BUTTONS.includes(button)) {
            return { valid: false, error: `Invalid button: ${button}` };
        }

        if (typeof value !== 'boolean') {
            return { valid: false, error: "Button value must be boolean" };
        }

        return { valid: true };
    }

    static validateAbilityKey(abilityKey, player) {
        if (!abilityKey || typeof abilityKey !== 'string') {
            return { valid: false, error: "Invalid ability key" };
        }

        // Check if player has this ability
        if (!player.abilitySystem.abilities[abilityKey]) {
            return { valid: false, error: `Ability ${abilityKey} not found` };
        }

        return { valid: true };
    }

    static validateNickname(nickname) {
        if (!nickname || typeof nickname !== 'string') {
            return { valid: false, error: "Nickname must be a string" };
        }

        const trimmed = nickname.trim();
        
        if (trimmed.length < 2) {
            return { valid: false, error: "Nickname too short (min 2 characters)" };
        }

        if (trimmed.length > 32) {
            return { valid: false, error: "Nickname too long (max 32 characters)" };
        }

        // Only allow alphanumeric, underscores, hyphens
        if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
            return { valid: false, error: "Invalid characters in nickname" };
        }

        return { valid: true, nickname: trimmed };
    }
}