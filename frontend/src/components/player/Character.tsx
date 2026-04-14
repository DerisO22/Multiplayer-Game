import { useGLTF } from "@react-three/drei";
const Character = () => {

     const { nodes, materials, scene } = useGLTF('/tomato.glb')
     
  


    

    return (
        <mesh>
           <primitive object={scene} />

        </mesh>
    )
};
//useGLTF.preload('/carrot.glb')
//useGLTF.preload('/cucumber.glb');
useGLTF.preload('/tomato.glb');
// useGLTF.preload('/potato.glb');
export default Character
