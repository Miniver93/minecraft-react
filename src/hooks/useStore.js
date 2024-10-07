import { create } from 'zustand'
import { nanoid } from 'nanoid'

export const useStore = create(set => ({
    texture: 'dirt',
    cubes: [{
        id: nanoid(),
        pos: [1, 1, 1],
        texture: 'dirt',
    },
    {
        id: nanoid(),
        pos: [5, 1, 1],
        texture: 'glass',
    }],

    addCube: (x, y, z) => {
        // Con esto añadimos a cubes, todos los cubos ya existentes y el nuevo
        set(state => ({
            cubes: [
                ...state.cubes,
                {
                    id: nanoid(),
                    pos: [x, y, z],
                    texture: state.texture
                }
            ]
        }))
    },
    removeCube: (id) => {
        set(state => ({
            // Con esto retornamos todos los cubos excepto el que queremos borrar. Es decir, al hacer click en un cubo, obtenemos la id del cubo y retornamos todos los cubos excepto el que queremos borrar.
            cubes: state.cubes.filter(cube => cube.id !== id)
        }))
    },
    setTexture: (texture) => {
        set(() => ({ texture })) // Esto es lo mismo que hacer set(state => ({texture: texture}))
    },
    saveWorld: () => {},
    resetWorld: () => {}

}))