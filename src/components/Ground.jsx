/* eslint-disable react/no-unknown-property */
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../js/textures";
import { useStore } from "../hooks/useStore";

export function Ground () {
    const addCube = useStore(state => state.addCube);
    const [ground] = usePlane(() => ({ 
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
     }));
     
     const handleClick = e => {
      e.stopPropagation();
      const [ x, y, z ] = Object.values(e.point).map(v => Math.ceil(v));// Obtenemos los valores del vector3 pasandolos a un array y los redondeamos hacia arriba. Así cada vez que hagamos click en el plano, se añadira un cubo en la posición del click y no se superpondrá con el otro.
      addCube(x, y, z);    
     }

    return (
       <mesh ref={ground}
       onClick={handleClick}>
          <planeGeometry attach='geometry' args={[100, 100]} />
          <meshStandardMaterial attach='material' map={groundTexture} />
       </mesh>
    );
};