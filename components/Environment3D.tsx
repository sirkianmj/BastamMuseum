import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage,
  Gltf, 
  Float, 
  PerspectiveCamera,
  TorusKnot,
  Html,
  useProgress,
  Sparkles,
  Environment,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { CameraMode } from '../types';

// Fix for missing JSX intrinsic elements definitions
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      primitive: any;
      gridHelper: any;
      fog: any;
      color: any;
      planeGeometry: any;
      pointLight: any;
      directionalLight: any;
    }
  }
}

interface Environment3DProps {
  modelUrl: string | null;
  mode: CameraMode;
  fileName?: string;
  scrollProgress: number;
}

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 backdrop-blur-md bg-white/10 p-6 rounded-lg border border-white/20 shadow-2xl">
        <div className="text-bastam-dark text-xs font-serif italic tracking-widest uppercase">
          Retrieving Artifact
        </div>
        <div className="h-[2px] w-32 bg-bastam-dark/10 relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-bastam-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[10px] text-bastam-text/40 font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
};

const SmartCamera = ({ mode }: { mode: CameraMode }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    if (cameraRef.current && mode === CameraMode.CINEMATIC) {
      // Very subtle breathing movement for the camera itself
      const t = state.clock.getElapsedTime();
      cameraRef.current.position.y = 2 + Math.sin(t * 0.2) * 0.1; 
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[4, 2, 5]} fov={40} />;
};

const ModelRenderer = ({ url, extension }: { url: string, extension: string }) => {
  if (extension === 'fbx') {
    const fbx = useLoader(FBXLoader, url);
    const clone = useMemo(() => fbx.clone(), [fbx]);
    return <primitive object={clone} />;
  }
  
  if (extension === 'obj') {
    const obj = useLoader(OBJLoader, url);
    const clone = useMemo(() => obj.clone(), [obj]);
    return <primitive object={clone} />;
  }

  return <Gltf src={url} />;
};

const ArtifactDisplay = ({ 
  url, 
  fileName, 
  scrollProgress, 
  mode 
}: { 
  url: string | null, 
  fileName?: string, 
  scrollProgress: number,
  mode: CameraMode
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const getExtension = (name?: string) => {
    if (!name) return 'glb';
    const parts = name.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  const extension = getExtension(fileName);

  useFrame(() => {
    if (groupRef.current && mode === CameraMode.CINEMATIC) {
      // Sync rotation with scroll
      // Full scroll = 2 full rotations (4PI)
      const targetRotation = scrollProgress * Math.PI * 4;
      // Smooth interpolation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float 
        speed={1.5} 
        rotationIntensity={mode === CameraMode.CINEMATIC ? 0.2 : 0} 
        floatIntensity={0.5} 
        floatingRange={[-0.1, 0.1]}
      >
        {url ? (
          <React.Suspense fallback={null}>
            <ModelRenderer url={url} extension={extension} />
          </React.Suspense>
        ) : (
            <TorusKnot args={[1, 0.3, 128, 16]} >
              <meshStandardMaterial 
                color="#c05621" 
                roughness={0.4} 
                metalness={0.1} 
              />
            </TorusKnot>
        )}
      </Float>
    </group>
  );
};

export const Environment3D: React.FC<Environment3DProps> = ({ modelUrl, mode, fileName, scrollProgress }) => {
  return (
    <div className="w-full h-full absolute inset-0 bg-[#eae8e1] z-0">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <React.Suspense fallback={<Loader />}>
          
          <SmartCamera mode={mode} />

          {/* Background Gradient / Fog */}
          <color attach="background" args={['#eae8e1']} />
          <fog attach="fog" args={['#eae8e1', 5, 25]} />

          {/* Atmospheric Particles - Ancient Dust */}
          <Sparkles 
            count={60} 
            scale={10} 
            size={3} 
            speed={0.4} 
            opacity={0.4} 
            color="#b49b57" 
            noise={0.5}
          />

          {/* Lighting Environment */}
          <Environment preset="city" blur={0.8} />

          {/* Stage handles lighting, centering, and scaling automatically */}
          <Stage 
            intensity={0.4} 
            shadows={false} // We will use ContactShadows manually for better control
            adjustCamera={false}
            preset="rembrandt"
          >
            <ArtifactDisplay 
              url={modelUrl} 
              fileName={fileName} 
              scrollProgress={scrollProgress}
              mode={mode}
            />
          </Stage>

          {/* Grounding Shadow */}
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            resolution={256} 
            color="#1c1917" 
          />

          {mode === CameraMode.ORBIT && (
            <OrbitControls 
              autoRotate={false} 
              enablePan={false} 
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 1.5} 
              enableZoom={true}
              makeDefault
            />
          )}
        </React.Suspense>
      </Canvas>
    </div>
  );
};