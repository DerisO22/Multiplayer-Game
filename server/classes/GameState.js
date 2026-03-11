export class GameState {
    constructor() {
        this.game_state = "WAITING" | "Ongoing" | "Ended";
        this.map = "Hill" | "Valley" | "Farm";
    }

    handleMapVote() {
        // Prob have some socket listener while the game is in waiting state
        // for map votes

        // might need it to do the voting in some sort of basic lobby for this
    }
}