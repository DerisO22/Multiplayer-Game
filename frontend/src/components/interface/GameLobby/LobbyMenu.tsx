import { useEffect, useState } from "react";
import { useSocket } from "../../../contexts/useSocket";
import { scroll_reveal } from "../../../utils/consts/ScrollReveal";

const LobbyMenu = () => {
    const { socket } = useSocket();
    const { isSettingsVisible, setIsSettingsVisible } = useState<boolean>(false);

    const handlePlayerExit = (e: React.MouseEvent) => {
        e.preventDefault();
        if(!socket) return;

        socket.emit("disconnect");
    };

    const handleMusicToggle = (e: React.MouseEvent) => {
        e.preventDefault();

        // some logic for toggling music. This could prob be some global state
    }

    const handleSettingsToggle = (e: React.MouseEvent) => {
        e.preventDefault();

        // some logic for toggling music. This could prob be some global state
    }

    useEffect(() => {
        scroll_reveal.reveal('.lobby_menu_container', { origin: 'right', delay: 1000 });
    }, []);

    return (
        <div className="lobby_menu_container">
            <button onClick={() => handlePlayerExit} className="menu_button"></button>
            <button onClick={() => handleMusicToggle} className="menu_button"></button>
            <button onClick={() => handleSettingsToggle} className="menu_button"></button>

            {}
        </div>
    );
}

export default LobbyMenu;