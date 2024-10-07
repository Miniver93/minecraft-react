import { grassImg, dirtImg, glassImg, woodImg, logImg } from "./images";

import { TextureLoader, RepeatWrapping, NearestFilter } from "three";

const dirtTexture = new TextureLoader().load(dirtImg);
const glassTexture = new TextureLoader().load(glassImg);
const grassTexture = new TextureLoader().load(grassImg);
const groundTexture = new TextureLoader().load(grassImg); // grassTexture;
const logTexture = new TextureLoader().load(logImg);
const woodTexture = new TextureLoader().load(woodImg);

const textures = [
    dirtTexture,
    glassTexture,
    grassTexture,
    logTexture,
    woodTexture,
    groundTexture,
]

textures.forEach((texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.magFilter = NearestFilter
})

groundTexture.repeat.set(100, 100)

export { dirtTexture, glassTexture, grassTexture, logTexture, woodTexture, groundTexture }