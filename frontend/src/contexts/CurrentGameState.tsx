import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./useSocket";

type GameStateEnum = "WAITING" | "VOTING" | "PLAYING" | "ENDED";

interface CurrentGameStateProviderProps {
    children: React.ReactNode,
}

const CurrentGameStateContext = createContext<GameStateEnum | undefined>(undefined);

export const CurrentGameStateProvider = ({ children }: CurrentGameStateProviderProps) => {
    const { socket } = useSocket();
    const [currentGameState, setCurrentGameState] = useState<GameStateEnum>("WAITING");

    const updateCurrentGameState = (current_game_state: "WAITING" | "VOTING" | "PLAYING" | "ENDED") => {
        setCurrentGameState(current_game_state);
    }

    useEffect(() => {
        if(!socket) return;

        socket.on('current_game_state', updateCurrentGameState);

        return () => {
            socket.off("current_game_state", updateCurrentGameState);
        }
    }, [ socket ]); 

    return (
        <CurrentGameStateContext.Provider value={currentGameState}>
            { children }
        </CurrentGameStateContext.Provider>
    )
}

export const useCurrentGameState = () => {
    const context = useContext(CurrentGameStateContext);

    if(context === undefined) {
        throw new Error("useCurrentGameState must be used within a CurrentGameStateProvider");
    }

    return context;
}