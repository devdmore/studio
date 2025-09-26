'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

/* Commenting out existing imports for now
import dynamic from 'next/dynamic';
import { portfolioData, Project as ProjectType } from '@/lib/portfolio-data';
import ThreeJSErrorBoundary from '@/components/ThreeJSErrorBoundary';
import * as THREE from 'three';
import { 
  ScrollControls, 
  Preload, 
  Environment, 
  Stars,
  Text3D
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  DepthOfField, 
  GodRays 
} from '@react-three/postprocessing';
*/

// Simple box component for testing
function Box(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function HeroText() {
    const { width } = useThree((state) => state.viewport);
    const fontUrl = "/fonts/SpaceGrotesk-Bold.ttf";

    return (
        <group>
            <Text3D
                font={fontUrl}
                size={width / 6}
                height={0.2}
                curveSegments={12}
                position={[-width / 2.5, 2, -5]}
                rotation={[0, 0.2, 0]}
            >
                {portfolioData.personal.name}
                <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={2} transparent />
            </Text3D>
            <Text3D
                font={fontUrl}
                size={width / 12}
                height={0.1}
                curveSegments={12}
                position={[-width / 2.5, 0.5, -5]}
                rotation={[0, 0.2, 0]}
            >
                {portfolioData.personal.title}
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent />
            </Text3D>
        </group>
    );
}

const tunnelShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#8a2be2') },
        uColor2: { value: new THREE.Color('#4b0082') },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;

        void main() {
            float time = uTime * 0.1;
            float stripe = fract((vUv.x + vUv.y * 5.0) * 10.0 + time);
            float step = step(0.5, stripe);
            vec3 color = mix(uColor1, uColor2, vUv.y);
            gl_FragColor = vec4(color * step, 1.0);
        }
    `,
};

function DigitalTunnel() {
    const shaderRef = useRef<THREE.ShaderMaterial>(null!);
    useFrame((_, delta) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value += delta;
        }
    });

    return (
        <mesh position={[0, -15, -50]} rotation={[Math.PI / 2, 0, 0]}>
            <tubeGeometry args={[new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -50),
                new THREE.Vector3(5, 0, -100),
                new THREE.Vector3(0, 0, -150)
            ]), 200, 2, 8, false]} />
            <shaderMaterial
                ref={shaderRef}
                args={[tunnelShader]}
                side={THREE.BackSide}
                transparent
            />
        </mesh>
    );
}

function Skills() {
    const { width } = useThree(state => state.viewport);
    const fontUrl = "/fonts/SpaceGrotesk-Regular.ttf";
    const skills = [...portfolioData.skills.advanced, ...portfolioData.skills.proficient];
    const codeSnippets = [
        "const portfolio = () =>",
        "useEffect(() => { ... })",
        "return <Canvas />",
        "color: #8a2be2;",
        "useFrame((state) => ...)"
    ];

    return (
        <group position={[0, -15, -80]}>
            {skills.map((skill, i) => (
                <Text3D
                    key={skill}
                    font={fontUrl}
                    size={width / 20}
                    height={0.05}
                    position={[(i % 2 === 0 ? -1 : 1) * width / 8, 0, i * -10]}
                    rotation={[0, (i % 2 === 0 ? 1 : -1) * 0.2, 0]}
                >
                    {skill}
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
                </Text3D>
            ))}
             {codeSnippets.map((snippet, i) => (
                <Text3D
                    key={snippet}
                    font={fontUrl}
                    size={width / 40}
                    height={0.01}
                    position={[(i % 2 === 0 ? 1.5 : -1.5) * width / 8, Math.sin(i*2) * 2, i * -25]}
                    rotation={[0, (i % 2 === 0 ? -1 : 1) * 0.3, 0]}
                >
                    {snippet}
                    <meshStandardMaterial color="#aaaaaa" emissive="#aaaaaa" emissiveIntensity={0.5} />
                </Text3D>
            ))}
        </group>
    );
}

function Particles() {
    const count = 500;
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }
        return positions;
    }, []);

    const particleRef = useRef<THREE.Points>(null!);
    useFrame(({ clock }) => {
        if (particleRef.current) {
            particleRef.current.position.z = (clock.getElapsedTime() * 0.5) % 100;
        }
    });

    return (
        <points ref={particleRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} />
        </points>
    );
}

interface ProjectProps {
    project: ProjectType;
    position: [number, number, number];
}

function Project({ project, position }: ProjectProps) {
    const ref = useRef<THREE.Group>(null!);
    const [isHovered, setIsHovered] = useState(false);

    useFrame((state, delta) => {
        if(ref.current) {
            ref.current.rotation.y += delta * (isHovered ? 0.4 : 0.1);
            if (isHovered) {
                ref.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <group
            ref={ref}
            position={position}
            onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
            onPointerOut={() => { setIsHovered(false); }}
        >
             <mesh position-z={-0.01}>
                <planeGeometry args={[4.2, 2.7]} />
                <meshStandardMaterial
                    color="white"
                    emissive="#8a2be2"
                    emissiveIntensity={isHovered ? 0.5 : 0}
                    toneMapped={false}
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <Image
                url={`https://picsum.photos/seed/${project.title}/400/300`}
                scale={[4, 2.5]}
            />
            <Text3D
                font="/fonts/SpaceGrotesk-Regular.ttf"
                size={0.25}
                height={0.05}
                position={[-2, -1.5, 0]}
            >
                {project.title}
                <meshStandardMaterial color="white" emissive="white" emissiveIntensity={isHovered ? 2 : 0.5} />
            </Text3D>
        </group>
    );
}

function ProjectsHub() {
    const projects = portfolioData.projects;
    const projectsPerRing = 5;
    const ringRadius = 8;

    return (
        <group position={[0, -15, -180]}>
             <Text3D font="/fonts/SpaceGrotesk-Bold.ttf" size={1.5} height={0.1} position={[-4, 5, 0]}>
                Projects
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
            </Text3D>
            {projects.map((project, i) => {
                const angle = (i / projectsPerRing) * Math.PI * 2;
                const x = Math.cos(angle) * ringRadius;
                const z = Math.sin(angle) * ringRadius;
                return <Project key={project.title} project={project} position={[x, 0, z]} />;
            })}
        </group>
    );
}


function SceneContent() {
  const { camera } = useThree();
  const scroll = useScroll();
  const timeline = useRef<gsap.core.Timeline>();
  const heroTextRef = useRef<THREE.Group>(null!);
  const animationState = useRef({ heroOpacity: 1 });
  const finalCameraPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    camera.position.set(0, 20, 15);
    camera.lookAt(0, 0, 0);
    finalCameraPosition.current.set(0, 0, -210);
  }, [camera]);

  useFrame((state) => {
    if (timeline.current) {
        timeline.current.seek(scroll.offset * timeline.current.duration());
    }
     if (heroTextRef.current) {
        heroTextRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                child.material.opacity = animationState.current.heroOpacity;
            }
        });
    }
    // Final camera float animation
    if (scroll.offset > 0.95) {
        const t = state.clock.getElapsedTime();
        camera.position.lerp(finalCameraPosition.current, 0.01);
        camera.position.x += Math.sin(t * 0.1) * 0.02;
        camera.position.y += Math.cos(t * 0.1) * 0.02;
    }
  });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power1.inOut' } });

    // Scene 1: Hero
    tl.to(camera.position, { x: 0, y: 2, z: 10 }, 0);
    tl.to(camera.rotation, { x: 0, y: 0, z: 0 }, 0);
    tl.to(heroTextRef.current.position, { y: -5, z: 0, duration: 1.5 }, 0);
    tl.to(heroTextRef.current.rotation, { x: Math.PI / 8, duration: 1.5 }, 0);
    tl.to(animationState.current, { heroOpacity: 0, duration: 0.75 }, 0.25);

    // Scene 2: Tunnel
    tl.to(camera.position, { x: 0, y: -15, z: -20 }, 1.5);
    tl.to(camera.rotation, { x: 0, y: 0, z: -0.1 }, 1.5);
    tl.to(camera.position, { z: -140 }, 2.5);

    // Scene 3: Projects Hub
    tl.to(camera.position, { x: 0, y: -15, z: -170 }, 4);
    tl.to(camera.rotation, { x: 0, y: 0, z: 0 }, 4);

    // Scene 4: Nebula
    tl.to(camera.position, { x: 0, y: 0, z: -200 }, 5.5);

    timeline.current = tl;
  }, [camera]);

  return (
    <>
      <City />
      <group ref={heroTextRef}>
        <HeroText />
      </group>
      <DigitalTunnel />
      <Skills />
      <Particles />
      <ProjectsHub />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Stars radius={60} depth={30} count={2000} factor={8} saturation={1} fade speed={1.5} />
    </>
  );
}

export default function ThreeJSScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}