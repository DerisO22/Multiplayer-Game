import { useState } from "react";
import type { GameState, PlayerChatInfo } from "../../utils/types/player";

const GameChat = ( gameState : GameState ) => {
    const [ chatState, setChatState ] = useState<PlayerChatInfo[]>(gameState.player_chats);

    return (
        <div className="player_chat_container">
            
        </div>
    )
}

export default GameChat;