import { createContext, useContext, useState } from "react";

export const DEFAULT_SOUND_VALUES = {
    sfx: 50,
    music: 50,
    other: 50
}

interface GameSoundContextType {
    volumeLevels: SoundSettingsType,
    handleVolumeChange: (volumeSetting: string, value: number) => void
}

interface SoundSettingsType {
    sfx: number,
    music: number,
    other: number
}

interface GameSoundProviderProps {
    children: React.ReactNode
}

const GameSoundContext = createContext<GameSoundContextType | undefined>(undefined);

export const GameSoundProvider = ({ children }: GameSoundProviderProps) => {
    const [ volumeLevels, setVolumeLevels ] = useState<SoundSettingsType>(DEFAULT_SOUND_VALUES);

    const handleVolumeChange = (volumeSetting: string, value: number) => {
        setVolumeLevels(prev => ({ ...prev, [volumeSetting]: value}));
    } 

    return (
        <GameSoundContext.Provider value={{volumeLevels, handleVolumeChange}}>
            { children }
        </GameSoundContext.Provider>
    )
}

export const useGameSound = () => {
    const context = useContext(GameSoundContext);

    if(context === undefined){
        throw new Error("useGameSound must be used within a GameSoundProvider");
    }

    return context;
}