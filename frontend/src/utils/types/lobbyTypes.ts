export interface CharacterInfo {  
    [key: string]: {
        name: string,
        description: string,
        color: number,
        abilities: string[],
        playstyle: string
    }
}

export interface CharacterPayloadData{
    characters: string[],
    characterInfo: CharacterInfo
}

export interface CharacterSelectionContextType {
    characterData: CharacterPayloadData | undefined,
    selectedCharacter: string | undefined,
    handleCharacterSelection: (characterType: string) => void
}

export interface CharacterSelectionProviderProps {
    children: React.ReactNode
}