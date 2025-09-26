// @ts-nocheck
'use client';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useScroll,
  Text,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  Environment,
} from '@react-three/drei';
import { portfolioData } from '@/lib/portfolio-data';

function SceneContent() {
  const content = useRef();
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  const [hovered, setHovered] = useState(null);

  useFrame(() => {
    if (content.current) {
      content.current.position.y = scroll.offset * -100;
    }
  });

  return (
    <group ref={content}>
      <Text
        position={[-width / 4, 0, 0]}
        fontSize={width / 8}
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        {portfolioData.personal.name}
      </Text>

      <group position={[0, -20, 0]}>
        <Text
          position={[-width / 4, 0, 0]}
          fontSize={width / 12}
          font="/fonts/SpaceGrotesk-Bold.ttf"
        >
          Skills
        </Text>
        <Text
          position={[0, -5, 0]}
          maxWidth={width * 0.8}
          textAlign="center"
          fontSize={width / 25}
          font="/fonts/SpaceGrotesk-Regular.ttf"
        >
          {portfolioData.skills.advanced.join(', ')},{' '}
          {portfolioData.skills.proficient.join(', ')}
        </Text>
      </group>

      <group position={[0, -40, 0]}>
        <Text
          position={[0, 0, 0]}
          textAlign="center"
          fontSize={width / 12}
          font="/fonts/SpaceGrotesk-Bold.ttf"
        >
          Projects
        </Text>
        {portfolioData.projects.map((project, i) => (
          <group key={i} position={[-width / 4 + (i % 3) * (width/4) , -10 - Math.floor(i / 3) * 10, 0]}>
            <Image
              url={`https://picsum.photos/seed/${i + 10}/400/300`}
              scale={[width / 8, width / 10, 1]}
              onPointerOver={() => setHovered(i)}
              onPointerOut={() => setHovered(null)}
            />
            {hovered === i && (
              <Text
                position={[0, -width/16, 1]}
                fontSize={width / 40}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/SpaceGrotesk-Regular.ttf"
              >
                {project.title}
              </Text>
            )}
          </group>
        ))}
      </group>
      
      <group position={[0, -80, 0]}>
        <Text
          position={[0, 0, 0]}
          textAlign="center"
          fontSize={width / 12}
          font="/fonts/SpaceGrotesk-Bold.ttf"
        >
          Contact
        </Text>
        <Text
          position={[0, -5, 0]}
          maxWidth={width * 0.8}
          textAlign="center"
          fontSize={width / 25}
          font="/fonts/SpaceGrotesk-Regular.ttf"
        >
          {portfolioData.personal.email}
        </Text>
      </group>
    </group>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, camera.position.z), 0.02);
    camera.lookAt(0, 0, 0);
  });
}

export function Scene() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <ScrollControls pages={10} damping={0.1}>
        <Scroll>
          <SceneContent />
        </Scroll>
      </ScrollControls>
      <Rig />
      <Preload />
    </Canvas>
  );
}
