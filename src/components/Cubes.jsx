import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes = () => {
    // Memorizar los cubos, para que solo cambien cuando el estado en `useStore` cambie
    const cubes = useStore((state) => state.cubes);

    // Memorizar el mapeo para evitar re-renderizados innecesarios
    
        return cubes.map(({ id, pos, texture }) => (
            <Cube key={id} id={id} position={pos} texture={texture} />
        ));
    // Solo recalcular cuando `cubes` cambie

    
};