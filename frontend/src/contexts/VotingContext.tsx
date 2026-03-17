import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useSocket } from "./useSocket";

interface VotingContextType {
    hasVotingStarted: boolean,
    hasVotingEnded: boolean,
}

interface VotingContextProviderProps {
    children: ReactNode
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingContextProvider = ({ children }: VotingContextProviderProps) => {
    const { socket } = useSocket();
    const [ hasVotingStarted, setHasVotingStarted ] = useState<boolean>(false);
    const [ hasVotingEnded, setHasVotingEnded ] = useState<boolean>(false);
    const [ map_winner, setMapWinner ] = useState<string>("");

    // handling all the different socket event emits and what nots
    useEffect(() => {
        if(!socket) return;

        socket.on("start_vote", ({ duration, server_time }) => {
            setHasVotingStarted(true);
            setHasVotingEnded(false);
        });

        socket.on("end_vote", () => {
            setHasVotingStarted(false);
            setHasVotingEnded(true);
        });
    }, []);

    const handle_player_vote = (e: React.MouseEvent<HTMLDivElement>, choice: string) => {
        e.preventDefault();
        if(!socket) return;

        socket?.emit("player_vote", { choice });
    }

    return (
        <VotingContext.Provider value={{hasVotingStarted, hasVotingEnded}}>
            { children }
        </VotingContext.Provider>
    );
}

export const useVoting = () => {
    const context = useContext(VotingContext);

    if(context === undefined) {
        throw new Error("useVoting must be used within a VotingContextProvider");
    }

    return context;
}