/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./components/ground";
import { FPV } from "./components/FPV";
import { Player } from "./components/Player";
import { Cubes } from "./components/Cubes.jsx";
import { TextureSelector } from "./components/TextureSelect.jsx";
function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]}/>
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Ground />
          <Player />
          <Cubes />
        </Physics>
      </Canvas>
      <div class="pointer">+</div>
        <TextureSelector />
    </>
  );
}

export default App;
