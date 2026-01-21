import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { HolographicMap } from './HolographicMap';
import { NeonParticles } from './NeonParticles';

interface CampusSceneProps {
  onBuildingHover: (building: string | null) => void;
  onBuildingClick: (building: string) => void;
}

export function CampusScene({ onBuildingHover, onBuildingClick }: CampusSceneProps) {
  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {/* Camera - isometric-style view from above */}
        <PerspectiveCamera makeDefault position={[35, 45, 35]} fov={50} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={30}
          maxDistance={100}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 3}
          target={[0, 0, 0]}
          autoRotate
          autoRotateSpeed={0.3}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#0099aa" />
        <directionalLight position={[20, 30, 10]} intensity={0.8} color="#00ccff" />
        <pointLight position={[0, 20, 0]} intensity={1.5} color="#00f3ff" distance={60} />
        <pointLight position={[-20, 15, 20]} intensity={1} color="#00ffcc" distance={50} />
        
        {/* Stars background */}
        <Stars radius={150} depth={80} count={3000} factor={4} saturation={0.5} fade speed={0.5} />
        
        {/* Gradient background fog */}
        <fog attach="fog" args={['#051520', 50, 150]} />
        
        {/* Holographic Map */}
        <HolographicMap 
          onBuildingHover={onBuildingHover} 
          onBuildingClick={onBuildingClick}
        />
        
        {/* Floating Particles */}
        <NeonParticles />
      </Suspense>
    </Canvas>
  );
}
