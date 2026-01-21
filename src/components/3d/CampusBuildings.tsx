import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface Building {
    id: string;
    name: string;
    hindiName: string;
    position: [number, number, number];
    scale: [number, number, number];
    color: string;
    glowColor: string;
    section?: string;
}

const CAMPUS_BUILDINGS: Building[] = [
    {
        id: 'main-gate',
        name: 'MITS Main Gate',
        hindiName: 'एमआईटीएस मेन गेट',
        position: [0, 2, 15],
        scale: [6, 4, 2],
        color: '#00f3ff',
        glowColor: '#00f3ff',
        section: 'schedule'
    },
    {
        id: 'library',
        name: 'MITS Library',
        hindiName: 'एमआईटीएस लाइबरी',
        position: [-12, 3, -5],
        scale: [8, 6, 6],
        color: '#9d00ff',
        glowColor: '#cc00ff',
        section: 'events'
    },
    {
        id: 'canteen',
        name: 'MITS Canteen',
        hindiName: 'एमआईटीएस कैंटीन',
        position: [-8, 2, 5],
        scale: [5, 4, 4],
        color: '#00ffc3',
        glowColor: '#00ffc3',
        section: 'merch'
    },
    {
        id: 'golden-garden',
        name: 'Golden Jubilee Garden',
        hindiName: 'गोल्डन जुबिली गार्डन',
        position: [15, 1, -8],
        scale: [7, 2, 7],
        color: '#ffcc00',
        glowColor: '#ffcc00',
        section: 'sponsors'
    },
    {
        id: 'diamond-gate',
        name: 'Diamond Jubilee Gate',
        hindiName: 'डायमंड जुबिली गेट',
        position: [5, 2.5, -18],
        scale: [5, 5, 2],
        color: '#ff006e',
        glowColor: '#ff00ff',
        section: 'competitions'
    },
    {
        id: 'civil-dept',
        name: 'Dept. of Civil Engineering',
        hindiName: 'सिविल इंजीनियरिंग विभाग',
        position: [8, 3.5, 0],
        scale: [6, 7, 5],
        color: '#00ccff',
        glowColor: '#00f3ff',
        section: 'events'
    },
    {
        id: 'biotech',
        name: 'Dept. of Biotechnology',
        hindiName: 'जैव प्रौद्योगिकी विभाग',
        position: [20, 2.5, 8],
        scale: [5, 5, 4],
        color: '#00ff88',
        glowColor: '#00ffc3',
        section: 'events'
    },
    {
        id: 'architecture',
        name: 'Dept. of Architecture',
        hindiName: 'वास्तुकला विभाग',
        position: [-5, 3, -15],
        scale: [6, 6, 5],
        color: '#ff9900',
        glowColor: '#ffcc00',
        section: 'events'
    },
    {
        id: 'shivji-mandir',
        name: 'Shivji Mandir',
        hindiName: 'शिवजी मंदिर',
        position: [-18, 2, 2],
        scale: [3, 4, 3],
        color: '#ff6600',
        glowColor: '#ff9900',
        section: 'about'
    },
    {
        id: 'medical',
        name: 'MITS Medical Dispensary',
        hindiName: 'एमआईटीएस मेडिकल डिस्पेंसरी',
        position: [22, 2, -5],
        scale: [4, 4, 3],
        color: '#ff0066',
        glowColor: '#ff006e',
        section: 'contact'
    }
];

interface CampusBuildingsProps {
    onHover: (building: string | null) => void;
    onClick: (building: string) => void;
    playerPosition: [number, number, number];
}

function HolographicBuilding({
    building,
    onHover,
    onClick,
    playerPosition
}: {
    building: Building;
    onHover: (building: string | null) => void;
    onClick: (building: string) => void;
    playerPosition: [number, number, number];
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [showLabel, setShowLabel] = useState(false);

    // Calculate distance from player
    const distance = Math.sqrt(
        Math.pow(building.position[0] - playerPosition[0], 2) +
        Math.pow(building.position[2] - playerPosition[2], 2)
    );

    // Animate on hover
    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Floating animation
            meshRef.current.position.y = building.position[1] + Math.sin(time * 2 + building.position[0]) * 0.2;

            // Scale pulse on hover
            if (hovered) {
                const scale = 1 + Math.sin(time * 4) * 0.05;
                meshRef.current.scale.setScalar(scale);
            } else {
                meshRef.current.scale.setScalar(1);
            }

            // Show label when close
            setShowLabel(distance < 15 || hovered);
        }
    });

    return (
        <group position={building.position}>
            {/* Main building mesh */}
            <mesh
                ref={meshRef}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    onHover(building.id);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    onHover(null);
                    document.body.style.cursor = 'default';
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(building.id);
                }}
            >
                <boxGeometry args={building.scale} />
                <meshPhysicalMaterial
                    color={building.color}
                    transparent
                    opacity={hovered ? 0.8 : 0.3}
                    emissive={building.glowColor}
                    emissiveIntensity={hovered ? 0.8 : 0.2}
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.5}
                    thickness={1}
                    clearcoat={1}
                    clearcoatRoughness={0}
                />
                <Edges
                    scale={1}
                    threshold={15}
                    color={building.glowColor}
                    renderOrder={1000}
                />
            </mesh>

            {/* Tech Roof Detail */}
            <mesh position={[0, building.scale[1] / 2 + 0.05, 0]}>
                <boxGeometry args={[building.scale[0] * 0.8, 0.1, building.scale[2] * 0.8]} />
                <meshBasicMaterial color={building.glowColor} transparent opacity={0.8} />
            </mesh>

            {/* Inner Core for depth */}
            <mesh scale={[0.85, 0.85, 0.85]}>
                <boxGeometry args={building.scale} />
                <meshBasicMaterial
                    color={building.color}
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Glow effect */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <boxGeometry args={building.scale} />
                <meshBasicMaterial
                    color={building.glowColor}
                    transparent
                    opacity={hovered ? 0.3 : 0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Floating label */}
            {showLabel && (
                <Html
                    position={[0, building.scale[1] + 1.5, 0]}
                    center
                    distanceFactor={15}
                    style={{
                        transition: 'all 0.2s',
                        opacity: showLabel ? 1 : 0,
                        transform: `scale(${showLabel ? 1 : 0.8})`,
                    }}
                >
                    <div
                        className="px-3 py-2 rounded-lg text-center whitespace-nowrap"
                        style={{
                            background: 'rgba(10, 10, 31, 0.9)',
                            border: `1px solid ${building.color}`,
                            boxShadow: `0 0 20px ${building.color}40`,
                        }}
                    >
                        <div className="font-orbitron text-sm font-bold" style={{ color: building.color }}>
                            {building.name}
                        </div>
                        <div className="font-rajdhani text-xs text-muted-foreground">
                            {building.hindiName}
                        </div>
                        {hovered && (
                            <div className="mt-1 text-xs font-mono text-accent animate-pulse">
                                Press E to interact
                            </div>
                        )}
                    </div>
                </Html>
            )}

            {/* Ground glow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -building.position[1] + 0.1, 0]}>
                <circleGeometry args={[Math.max(...building.scale) * 0.8, 32]} />
                <meshBasicMaterial
                    color={building.glowColor}
                    transparent
                    opacity={hovered ? 0.4 : 0.15}
                />
            </mesh>
        </group>
    );
}

export function CampusBuildings({ onHover, onClick, playerPosition }: CampusBuildingsProps) {
    return (
        <group>
            {CAMPUS_BUILDINGS.map((building) => (
                <HolographicBuilding
                    key={building.id}
                    building={building}
                    onHover={onHover}
                    onClick={onClick}
                    playerPosition={playerPosition}
                />
            ))}
        </group>
    );
}
