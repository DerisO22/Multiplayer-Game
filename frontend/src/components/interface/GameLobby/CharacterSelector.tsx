import { useCharacterSelect } from "../../../contexts/CharacterSelectionContext"

const CharacterSelector = () => {
    const { characterData, handleCharacterSelection } = useCharacterSelect();

    console.log(characterData);

    return (
        <div>
        
        </div>
    )
}

export default CharacterSelector
