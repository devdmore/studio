'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, ScrollControls, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, GodRays } from '@react-three/postprocessing';
import SceneContent from './SceneContent';

interface ThreeJSCanvasProps {
  sunRef: React.RefObject<THREE.Mesh>;
}

export default function ThreeJSCanvas({ sunRef }: ThreeJSCanvasProps) {
  return (
    <Canvas dpr={[1, 2]}>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#0a0a1a', 10, 60]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 30, -10]} intensity={200} color="#8a2be2" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />
      <Environment preset="night" />
      
      <mesh ref={sunRef} position={[0, 25, -50]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>

      <ScrollControls pages={10} damping={0.2}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </ScrollControls>

      <Preload all />

      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.3} 
          luminanceSmoothing={0.9} 
          height={300} 
          intensity={1.5} 
        />
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.02} 
          bokehScale={2} 
          height={480} 
        />
        <GodRays
          sun={sunRef.current}
          samples={50}
          density={0.97}
          decay={0.97}
          weight={0.6}
          exposure={0.4}
        />
      </EffectComposer>
    </Canvas>
  );
}