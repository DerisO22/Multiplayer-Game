import { OrbitControls } from "@react-three/drei";
import { useGameState } from "../../contexts/useGameState"
import { useSocket } from "../../contexts/useSocket";
import { PlayerCube } from "../player/PlayerCube";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

interface GameWorldProps {
    cameraMode: 'follow' | 'orbit',
}

// Camera follower component
function CameraFollower({ targetRef }: { targetRef: React.RefObject<Mesh> }) {
    const { camera } = useThree();
    const cameraTarget = useRef(new Vector3());

    useFrame((_, delta) => {
        if (targetRef.current) {
            const { x, y, z } = targetRef.current.position;
            cameraTarget.current.set(
                x,
                y + 5,
                z + 10
            );
            camera.position.lerp(cameraTarget.current, 1 - Math.pow(0.01, delta));
            camera.lookAt(x, y, z);
        }
    });

    return null;
}

const GameWorld = ({ cameraMode } : GameWorldProps) => {
    const gameState = useGameState();
    const socket = useSocket();
    const localPlayerRef = useRef<Mesh>(null);

    // Find local player
    const localPlayer = gameState.players.find(player => player.id === socket?.id);
    const localPlayerPosition = localPlayer?.position || null;

    return (
        <>
            {/* Render all players */}
            {gameState.players.map((player) => (
                <PlayerCube
                    ref={player.id === socket?.id ? localPlayerRef : null}
                    key={player.id}
                    position={player.position}
                    isLocalPlayer={player.id === socket?.id}
                />
            ))}

            {/* Camera controls */}
            {cameraMode === 'follow' && (
                <CameraFollower targetRef={localPlayerRef} />
            )}
        </>
    )
}

export default GameWorld
