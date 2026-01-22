import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { HolographicMap } from './HolographicMap';
import { NeonParticles } from './NeonParticles';

interface CampusSceneProps {
    onBuildingHover: (building: string | null) => void;
    onBuildingClick: (building: string) => void;
    isLoading?: boolean;
}

export function CampusScene({ onBuildingHover, onBuildingClick, isLoading = false }: CampusSceneProps) {
    return (
        <Canvas
            className="w-full h-full"
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                shadows: true,
                stencil: false,
                depth: true
            }}
            dpr={[1, 2]}
            shadows
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

                {/* Lighting - Kidcore Theme with Shadows */}
                <ambientLight intensity={0.6} color="#00A6FF" />
                <directionalLight
                    position={[40, 50, 30]}
                    intensity={1.0}
                    color="#FF5E1F"
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={200}
                    shadow-camera-left={-100}
                    shadow-camera-right={100}
                    shadow-camera-top={100}
                    shadow-camera-bottom={-100}
                />
                <pointLight position={[0, 30, 0]} intensity={1.2} color="#FF85C0" distance={80} castShadow />
                <pointLight position={[-30, 20, 30]} intensity={0.8} color="#B0FF57" distance={60} />

                {/* Stars background */}
                <Stars radius={150} depth={80} count={3000} factor={4} saturation={0.5} fade speed={0.5} />

                {/* Dark background fog */}
                <fog attach="fog" args={['#0A0E27', 50, 150]} />
                {/* Holographic Map */}
                <HolographicMap
                    onBuildingHover={onBuildingHover}
                    onBuildingClick={onBuildingClick}
                    isLoading={isLoading}
                />

                {/* Floating Particles */}
                <NeonParticles />
            </Suspense>
        </Canvas>
    );
}
