import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SocketProvider } from './contexts/useSocket.tsx';
import { GameProvider } from './contexts/useGameState.tsx';
import { ChatInputProvider } from './contexts/ChatInput.tsx';
import { VotingContextProvider } from './contexts/VotingContext.tsx';
import { LobbyProvider } from './contexts/LobbyContext.tsx';
import { GameSoundProvider } from './contexts/GameSoundsContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
		<SocketProvider>
			<GameProvider>
				<GameSoundProvider>
				<LobbyProvider>
				<VotingContextProvider>
				<ChatInputProvider>
					<App />
				</ChatInputProvider>
				</VotingContextProvider>
				</LobbyProvider>
				</GameSoundProvider>
			</GameProvider>
		</SocketProvider>
    </StrictMode>,
)
