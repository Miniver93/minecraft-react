import { useEffect, useState } from "react"

const ACTION_KEYBOARD_MAP = {
    'KeyW': 'moveForward',
    'KeyS': 'moveBackward',
    'KeyA': 'moveLeft',
    'KeyD': 'moveRight',
    'Space': 'jump',
    'Digit1': 'dirt',
    'Digit2': 'glass',
    'Digit3': 'grass',
    'Digit4': 'log',
    'Digit5': 'wood'
}
export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            const action = ACTION_KEYBOARD_MAP[e.code]
            if (action) {
                setActions(prev => ({ ...prev, [action]: true }))
            }
        }

        const handleKeyUp = (e) => {
            const action = ACTION_KEYBOARD_MAP[e.code]
            if (action) {
                setActions(prev => ({ ...prev, [action]: false }))
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        // Para que se destruyan los listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return actions
}