import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

// Camera follower component
export function CameraFollower({ targetRef }: { targetRef: React.RefObject<Mesh> }) {
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