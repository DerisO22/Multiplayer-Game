import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

interface PlayerProps {
    position: { x: number; y: number; z: number };
    isLocalPlayer?: boolean;
}

export const PlayerCube: React.FC<PlayerProps> = ({ position, isLocalPlayer = false }) => {
    const meshRef = useRef<Mesh>(null);

    const lerpTarget = useRef(new Vector3());

    useFrame(() => {
        if(meshRef.current) {
            lerpTarget.current.set(position.x, position.y, position.z);

            meshRef.current.position.lerp(lerpTarget.current, 0.5);
        }
    });

    return (
        <mesh ref={meshRef}>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color={isLocalPlayer ? '#4080ff' : '#ff4040'} />
        </mesh>
    );
};