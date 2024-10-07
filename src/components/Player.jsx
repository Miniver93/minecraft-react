import { useSphere } from "@react-three/cannon"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyBoard"

const CHARACTER_SPEED = 4
const CHARACTER_JUMP_POWER = 4
export const Player = () => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard()
    const { camera } = useThree()
    const [ ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 0.5, 0],
    }))

    // Referencia para la posición de la cámara
    const pos = useRef([0, 0, 0])

    useEffect(() => {
        // Cuando la posición de la esfera cambie, actualizamos la posición de la cámara
        api.position.subscribe((value) => {
            pos.current = value
        })
    }, [api.position])

    // Referencia para la velocidad de la cámara
    const vel = useRef([0, 0, 0])

    useEffect(() => {
        // Cuando la velocidad de la esfera cambie, actualizamos la velocidad de la cámara
        api.velocity.subscribe((value) => {
            vel.current = value
        })
    }, [api.velocity])

    // Actualizamos la posición de la cámara
    useFrame(() => {
        camera.position.copy(
            new Vector3(
                pos.current[0], // Posición X
                pos.current[1], // Posición Y
                pos.current[2] // Posición Z
            )
        )

        const direction = new Vector3()
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0) // Si se presiona el botón de retroceso hacia atrás, se establece en 0, y si no, en 1. Si se presiona el botón de adelante hacia delante, se establece en -1, y si no, en 0
        )

        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0), // Si se presiona el botón de la izquierda, se establece en 1, y si no, en 0. Si se presiona el botón de la derecha, se establece en -1, y si no, en 0
            0,
            0
        )
        
        direction
            .subVectors(frontVector, sideVector) // Eso sirve para restar los dos vectores
            .normalize() // Esto sirve para normalizar el vector, que significa que la longitud del vector sea 1
            .multiplyScalar(CHARACTER_SPEED) // Esto sirve para multiplicar el vector por 10, que significa que la velocidad se mueva 10 unidades por segundo
            .applyEuler(camera.rotation) // Esto sirve para aplicar la rotación de la cámara para que el personaje se mueva con la rotación de la cámara

        api.velocity.set(
            direction.x,
             vel.current[1], // La velocidad de la esfera se establece en la componente Y de la velocidad de la cámara
              direction.z
            )

        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(
                vel.current[0],
                CHARACTER_JUMP_POWER,
                vel.current[2]
            )
        }
    })

    return (
        <mesh ref={ref} />
    )
}