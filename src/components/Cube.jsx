/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useBox } from "@react-three/cannon"
import * as textures from "../js/textures" 
import { useState } from "react"
import { useStore } from "../hooks/useStore"

export const Cube = ({ id, position, texture }) => {
    const [isHovered, setIsHovered] = useState(false)
    const removeCube = useStore(state => state.removeCube)
    const activeTexture = textures[texture + "Texture"] // AL pasar el texto "dirtTexture" se obtendra la textura de dirt

    const [ref] = useBox(() => ({
        position,
        type: "Static",
    }))

    return (
        <mesh ref={ref}
       onPointerMove={e => {
         e.stopPropagation();
         setIsHovered(true);
       }}
       onPointerOut={e => {
         e.stopPropagation();
         setIsHovered(false);
      }}
      onClick={e => {   
        e.stopPropagation()
        if (e.altKey){
            removeCube(id)
        }
      }}>
            <boxGeometry attach="geometry"/>
            <meshStandardMaterial color={isHovered ? "lightgrey" : "white"} transparent attach="material" map={activeTexture}/>
        </mesh>
    )
}