import { useFrame } from '@react-three/fiber';
import { forwardRef, useRef } from 'react';
//import { Mesh, Vector3 } from 'three';
import { Group, Vector3 } from 'three'; 
import { useGLTF } from '@react-three/drei';
interface PlayerProps {
    position: { x: number; y: number; z: number };
    isLocalPlayer?: boolean;
    team?: 'red' | 'blue';
    isDead?: boolean;
}

export const PlayerCube = forwardRef<Group, PlayerProps>(
    ({ position, isLocalPlayer = false, team = 'red', isDead = false }, ref) => {
         const { scene, nodes, materials } = useGLTF('/tomato.glb');
        const internalRef = useRef<Group>(null);
        const lerpTarget = useRef(new Vector3());

        // Use the forwarded ref for local player, internal ref for remote players
        const meshRef = (ref && 'current' in ref ? ref : internalRef) as React.RefObject<Group>;

        useFrame((_, delta) => {
            if (meshRef.current) {
                lerpTarget.current.set(position.x, position.y, position.z);
                meshRef.current.position.lerp(lerpTarget.current, 0.2);
            }
        });

        // Determine color based on team and state
        const getPlayerColor = () => {
            if (isDead) return '#444444';
            if (isLocalPlayer) return '#ffff00'; 
            
            // Color by team
            switch (team) {
                case 'red':
                    return '#ff4444';
                case 'blue':
                    return '#4444ff';
                default:
                    return '#ffffff';
            }
        };

        const playerColor = getPlayerColor();

        return (
            // <mesh ref={meshRef}>
            //  <group ref={meshRef as any}>
            //     <primitive object={scene} /> 
            //     <capsuleGeometry args={[0.5, 1, 4, 8]} />
            //     <meshStandardMaterial 
            //         color={playerColor}
            //         emissive={isLocalPlayer ? 0xffff00 : undefined}
            //         emissiveIntensity={isLocalPlayer ? 0.3 : 0}
                    
            
            // </mesh>
            // </group>
             <group ref={meshRef}>
                {/* This replaces your old <mesh> and <capsuleGeometry> */}
                <primitive 
                    object={scene} 
                    scale={0.5} // Adjust scale as needed
                />
                
                {/* OPTIONAL: If you want to force the team color onto the carrot's material */}
                <meshStandardMaterial 
                    attach="material" 
                    color={playerColor} 
                />
            </group>
        );

    }
);

PlayerCube.displayName = 'PlayerCube';