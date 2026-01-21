import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { Suspense, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { HolographicGrid } from './HolographicGrid';
import { CampusBuildings } from './CampusBuildings';
import { PlayerCharacter } from './PlayerCharacter';
import { NeonParticles } from './NeonParticles';

interface CampusSceneProps {
  onBuildingHover: (building: string | null) => void;
  onBuildingClick: (building: string) => void;
}

export function CampusScene({ onBuildingHover, onBuildingClick }: CampusSceneProps) {
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 0, 0]);
  
  const handlePlayerMove = useCallback((newPosition: [number, number, number]) => {
    setPlayerPosition(newPosition);
  }, []);

  return (
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 30, 40]} fov={60} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={15}
          maxDistance={80}
          maxPolarAngle={Math.PI / 2.2}
          target={playerPosition}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} color="#3300ff" />
        <directionalLight position={[10, 20, 5]} intensity={0.5} color="#00ccff" />
        <pointLight position={[0, 15, 0]} intensity={2} color="#ff00ff" distance={50} />
        <pointLight position={[20, 10, 10]} intensity={1.5} color="#00ffff" distance={40} />
        <pointLight position={[-20, 10, -10]} intensity={1.5} color="#9d00ff" distance={40} />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a1f', 30, 100]} />
        
        {/* Holographic Grid */}
        <HolographicGrid />
        
        {/* Campus Buildings */}
        <CampusBuildings 
          onHover={onBuildingHover} 
          onClick={onBuildingClick}
          playerPosition={playerPosition}
        />
        
        {/* Player Character */}
        <PlayerCharacter 
          position={playerPosition}
          onMove={handlePlayerMove}
        />
        
        {/* Floating Particles */}
        <NeonParticles />
      </Suspense>
    </Canvas>
  );
}
