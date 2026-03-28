import { createContext, useContext, useState } from "react";
import type { KeyBindings } from "../utils/types/controlType";
import type { PlayerSounds, PlayerStats } from "../utils/types/player";

export interface PlayerContextType {
    playerData: PlayerDataType | undefined
    get_player_data: (player_clerk_id: number) => void,
    save_player_data: () => void
}

export interface PlayerDataType {
    player_clerk_id: string,
    player_keybinds: KeyBindings,
    player_stats: PlayerStats,
    player_sounds: PlayerSounds
}

interface PlayerProviderPropsType {
    children: React.ReactNode
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children } : PlayerProviderPropsType) => {
    const [ playerData, setPlayerData ] = useState<PlayerDataType | undefined>();

    const get_player_data = (player_clerk_id: number) => {

    }

    const save_player_data = () => {
        
    }

    return (
        <PlayerContext.Provider value={{ playerData, get_player_data, save_player_data}}>
            { children }
        </PlayerContext.Provider>
    )
}

export const usePlayerData = () => {
    const context = useContext(PlayerContext);

    if(context === undefined){
        throw new Error("usePlayerData must be used within a PlayerProvider");
    }

    return context;
}