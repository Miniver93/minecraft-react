import * as images from "../js/images";
import { useStore } from "../hooks/useStore";
import { useEffect } from "react";
import { useKeyboard } from "../hooks/useKeyBoard";

export const TextureSelector = () => {
    const { texture, setTexture } = useStore();
    const {
        dirt,
        grass,
        glass,
        wood,
        log
    } = useKeyboard();

    useEffect(() => {
        const options = {
            dirt,
            grass,
            glass,
            wood,
            log
        }

        const selectedTexture = Object.entries(options).find(([texture, isEnabled]) => isEnabled === true); // Retorna el primer elemento que cumpla la condición

        if (selectedTexture) {
            const [textureName] = selectedTexture // Obtenemos el nombre de la textura
            setTexture(textureName); 
        }
    }, [dirt, grass, glass, wood, log]);

    return (
        <div className="texture-selector">
            {Object.entries(images).map(([imageName, image]) => {
                return (
                    <img className={texture === imageName.replace('Img', '') ? 'selected' : ''} key={imageName} src={image} alt={imageName}/>
                )
            })}
        </div>
    )
}