import { useFrame } from '@react-three/fiber';
import { forwardRef, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

interface PlayerProps {
    position: { x: number; y: number; z: number };
    isLocalPlayer?: boolean;
}

export const PlayerCube = forwardRef<Mesh, PlayerProps>(({ position, isLocalPlayer = false }, ref) => {
    const internalRef = useRef<Mesh>(null);
    const lerpTarget = useRef(new Vector3());

    // Use the forwarded ref for local player, internal ref for remote players
    const meshRef = (ref && 'current' in ref ? ref : internalRef) as React.RefObject<Mesh>;

    useFrame((_, delta) => {
        if (meshRef.current) {
            lerpTarget.current.set(position.x, position.y, position.z);
            meshRef.current.position.lerp(lerpTarget.current, 0.2);
        }
    });

    return (
        <mesh ref={meshRef}>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color={isLocalPlayer ? '#4080ff' : '#ff4040'} />
        </mesh>
    );
});