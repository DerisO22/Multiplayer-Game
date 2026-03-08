import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface ChatInputContextType {
    isPlayerInputting: boolean;
    setIsPlayerInputting: Dispatch<SetStateAction<boolean>>
}

interface ChatInputProviderProps {
    children: ReactNode;
}

const ChatInputContext = createContext<ChatInputContextType | undefined>(undefined);

export const ChatInputProvider = ({ children }: ChatInputProviderProps ) => {
    const [ isPlayerInputting, setIsPlayerInputting ] = useState<boolean>(false);

    useEffect(() => {
        setIsPlayerInputting(false);
    }, [])

    return (
        <ChatInputContext.Provider value={{ isPlayerInputting, setIsPlayerInputting }}>
            { children }
        </ChatInputContext.Provider>
    )
};

export const useChatInput = () => {
    const context = useContext(ChatInputContext);

    if(context === undefined){
        throw new Error("useChatInput cant be used outside of a ChatInputProvider");
    }

    return context;
}