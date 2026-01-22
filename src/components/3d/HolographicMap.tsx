import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text, Float, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

// --- Types ---
interface BuildingData {
    id: string;
    name: string;
    hindiName: string;
    // Position: [x, z], Size: [width, length], Height
    position: [number, number];
    size: [number, number];
    height: number;
    type?: 'complex' | 'simple' | 'landmark';
    icon?: string;
    color?: string;
}

// --- Configuration --- Kidcore Theme
const THEME = {
    primary: '#00A6FF',     // Electric Blue
    secondary: '#FF5E1F',   // Safety Orange
    accent: '#FF85C0',      // Bubblegum Pink
    lime: '#B0FF57',        // Lime Green
    yellow: '#FFDD33',      // Sunflower Yellow
    ground: '#FFF9E6',      // Cream Background
    black: '#1A1A1A',       // Gritty Black
    glow: '#FF5E1F',        // Orange Glow
    glassOpacity: 0.2,
    edgeOpacity: 0.9
};

// --- Data: Mapped to the Diamond Layout ---
// The map is rotated 45deg. 
const BUILDINGS: BuildingData[] = [
    // Top Corner
    { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [5, -25], size: [4, 2], height: 2, type: 'landmark', icon: '🎓' },

    // Left Wing (Civil/Canteen area)
    { id: 'old building', name: 'Old Building', hindiName: 'सिविल विभाग', position: [-6, -10], size: [16, 7], height: 2.5, type: 'complex' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-15, -12], size: [4, 4], height: 1.5, type: 'simple', icon: '🍽️' },
    { id: 'AI department', name: 'AI department', hindiName: 'कैंटीन', position: [-3, 4], size: [9, 5], height: 6, type: 'simple', icon: '🍽️' },
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-7, -16], size: [4, 3], height: 3, type: 'complex', icon: '📚' },

    // Center
    { id: 'golden-garden', name: 'stage ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, -22], size: [15, 6], height: 0.2, type: 'landmark', color: '#FFDD33' },
    { id: 'golden-garden', name: 'AI ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-3, -2], size: [9, 7], height: 0.2, type: 'landmark', color: '#B0FF57' },
    { id: 'golden-garden', name: 'statue ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [15, -18.5], size: [10, 10], height: 0.2, type: 'landmark', color: '#FF85C0' },
    { id: 'golden-garden', name: 'football ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, 22], size: [30, 15], height: 0.2, type: 'landmark', color: '#00A6FF' },

    // Right Wing (Biotech/Medical)
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15, -11], size: [5, 5], height: 2.5, type: 'simple' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [15, -4], size: [4, 4], height: 1.5, type: 'simple', icon: 'H' },

    // Bottom Section (Architecture/Main Block)
    { id: 'architecture', name: 'Architecture Dept', hindiName: 'वास्तुकला', position: [-10, -3], size: [4, 4], height: 2.8, type: 'complex' },
    { id: 'architecture', name: 'Mechanical Dept', hindiName: 'वास्तुकला', position: [0, -5.5], size: [4, 4], height: 2.8, type: 'complex' },
    { id: 'golden-garden', name: 'statue', hindiName: 'वास्तुकला', position: [15, -18.5], size: [2, 2], height: 1.5, type: 'simple' },
    { id: 'golden-garden', name: 'statue', hindiName: 'वास्तुकला', position: [15, -18.5], size: [1, 1], height: 3, type: 'simple' },
    { id: 'mits-main', name: 'mechanical workshop', hindiName: 'मुख्य भवन', position: [0, 15], size: [7, 5], height: 3.5, type: 'complex', icon: '🏛️' },

    // Bottom Corner
    { id: 'diamond-gate', name: 'Diamond Jubilee Gate', hindiName: 'डायमंड गेट', position: [-20, 16], size: [4, 1], height: 2, type: 'landmark' },
];

const ROADS = [
    // The Square/Diamond Perimeter
    { points: [[-16, -20], [16, -20], [16, 20], [-16, 20], [-16, -20]] }, // Outer Loop
    { points: [[-18, -18], [18, 18]] }, // Diagonal Cross (Sun City to Gate)
    { points: [[-5, -5], [5, -5], [5, 5], [-5, 5], [-5, -5]] }, // Inner Garden Loop

    // Road from MITS Main Gate to campus center
    { points: [[5, -25], [5, -20], [0, -10]] }, // Main gate entry road connecting to Old Building
];

// --- Components ---

/**
 * Enhanced Realistic Holographic Material
 * Better material properties for more realistic rendering
 */
const HoloMaterial = ({ hovered, color = THEME.primary }: { hovered: boolean, color?: string }) => (
    <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.1}
        roughness={0.25}
        metalness={0.6}
        transmission={0.4}
        thickness={1.5}
        transparent
        opacity={hovered ? 0.8 : 0.35}
        side={THREE.DoubleSide}
        envMapIntensity={0.8}
        ior={1.5}
    />
);

/**
 * Renders the glowing neon edges of a building
 */
const NeonEdges = ({ geometry, color = THEME.primary }: { geometry: THREE.BufferGeometry, color?: string }) => {
    return (
        <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color={color} transparent opacity={THEME.edgeOpacity} linewidth={2} />
        </lineSegments>
    );
};

const Building = ({ data, onHover, onClick, showLabels = false }: { data: BuildingData, onHover: any, onClick: any, showLabels?: boolean }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Create specific geometries based on "type" to mimic the satellite map shapes
    const geometry = useMemo(() => {
        if (data.type === 'complex') {
            // Creates a hollow-ish building (Courtyard style) with beveled corners
            const shape = new THREE.Shape();
            const w = data.size[0] / 2;
            const h = data.size[1] / 2;
            const bevel = 0.3;

            // Outer rectangle with beveled corners
            shape.moveTo(-w + bevel, -h);
            shape.lineTo(w - bevel, -h);
            shape.quadraticCurveTo(w, -h, w, -h + bevel);
            shape.lineTo(w, h - bevel);
            shape.quadraticCurveTo(w, h, w - bevel, h);
            shape.lineTo(-w + bevel, h);
            shape.quadraticCurveTo(-w, h, -w, h - bevel);
            shape.lineTo(-w, -h + bevel);
            shape.quadraticCurveTo(-w, -h, -w + bevel, -h);

            // Inner hole (Courtyard) with beveled corners
            const holePath = new THREE.Path();
            const pad = 1.2;
            holePath.moveTo(-w + pad + 0.2, -h + pad);
            holePath.lineTo(w - pad - 0.2, -h + pad);
            holePath.quadraticCurveTo(w - pad, -h + pad, w - pad, -h + pad + 0.2);
            holePath.lineTo(w - pad, h - pad - 0.2);
            holePath.quadraticCurveTo(w - pad, h - pad, w - pad - 0.2, h - pad);
            holePath.lineTo(-w + pad + 0.2, h - pad);
            holePath.quadraticCurveTo(-w + pad, h - pad, -w + pad, h - pad - 0.2);
            holePath.lineTo(-w + pad, -h + pad + 0.2);
            holePath.quadraticCurveTo(-w + pad, -h + pad, -w + pad + 0.2, -h + pad);
            shape.holes.push(holePath);

            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.1, bevelSegments: 3 });
        } else if (data.id === 'main-gate' || data.id === 'diamond-gate') {
            // Archway shape with more detail
            return new THREE.TorusGeometry(data.size[0] / 3, 0.35, 16, 32, Math.PI);
        }
        // Default Box with better proportions
        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1], 4, 8, 4);
    }, [data]);

    useFrame((state) => {
        if (!mesh.current) return;
        // Float animation
        const t = state.clock.getElapsedTime();
        mesh.current.position.y = (data.height / 2) + Math.sin(t * 2 + data.position[0]) * 0.1;

        // Rotation for archways
        if (data.id.includes('gate')) {
            mesh.current.rotation.x = 0; // Reset default rotation for torus
        }
    });

    const handlePointerOver = (e: any) => {
        e.stopPropagation();
        setHover(true);
        onHover(data.id);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHover(false);
        onHover(null);
        document.body.style.cursor = 'default';
    };

    return (
        <group position={[data.position[0], 0, data.position[1]]}>
            {/* The Building Mesh */}
            <mesh
                ref={mesh}
                geometry={geometry}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={() => onClick(data.id)}
                rotation={[data.type === 'complex' ? -Math.PI / 2 : 0, 0, 0]} // Rotate extruded geo
            >
                <HoloMaterial hovered={hovered} color={data.color} />
                <NeonEdges geometry={geometry} color={data.color || THEME.primary} />
            </mesh>

            {/* Base Glow Plate */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                <planeGeometry args={[data.size[0] * 1.2, data.size[1] * 1.2]} />
                <meshBasicMaterial
                    color={data.color || THEME.primary}
                    transparent
                    opacity={hovered ? 0.3 : 0.05}
                />
            </mesh>

            {/* Building Name - Visible After Loading */}
            {showLabels && (
                <Html
                    position={[0, data.height + 1.5, 0]}
                    center
                    distanceFactor={20}
                    zIndexRange={[1000, 0]}
                    occlude="blended"
                >
                    <div style={{
                        background: 'rgba(0, 166, 255, 0.85)',
                        border: '2px solid #1A1A1A',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: '#1A1A1A',
                        fontFamily: 'Orbitron, sans-serif',
                        textAlign: 'center',
                        backdropFilter: 'blur(8px)',
                        boxShadow: `0 0 20px rgba(255, 94, 31, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)`,
                        fontSize: '0.85em',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        transform: 'translateZ(100px)',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{ fontSize: '1em', color: '#1A1A1A', letterSpacing: '0.5px' }}>
                            {data.name}
                        </div>
                        {data.hindiName && (
                            <div style={{ fontSize: '0.75em', color: '#FF5E1F', marginTop: '2px', letterSpacing: '0.3px' }}>
                                {data.hindiName}
                            </div>
                        )}
                    </div>
                </Html>
            )}

            {/* Enhanced Hover Label */}
            {hovered && (
                <Html position={[0, data.height + 3.5, 0]} center distanceFactor={20} zIndexRange={[1000, 0]} occlude="blended">
                    <div style={{
                        background: 'rgba(255, 85, 192, 0.95)',
                        border: '3px solid #1A1A1A',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        color: '#1A1A1A',
                        fontFamily: 'Orbitron, sans-serif',
                        textAlign: 'center',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(255, 85, 192, 0.8), 0 0 60px rgba(255, 94, 31, 0.4)',
                        fontSize: '0.95em',
                        fontWeight: 'bold'
                    }}>
                        <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>📍 {data.icon || '🏢'} {data.name}</div>
                        <div style={{ fontSize: '0.75em', marginTop: '4px', opacity: 0.8 }}>{data.type?.toUpperCase()}</div>
                    </div>
                </Html>
            )}
        </group>
    );
};

const HoloRoads = () => {
    // Convert points to Three vectors
    const lines = useMemo(() => {
        return ROADS.map(road => {
            const points = road.points.map(p => new THREE.Vector3(p[0], 0.05, p[1]));
            return new THREE.BufferGeometry().setFromPoints(points);
        });
    }, []);

    return (
        <group>
            {/* Main road lines - Electric Blue glowing roads */}
            {lines.map((geo, i) => (
                <group key={i}>
                    {/* Primary glowing line */}
                    <lineSegments geometry={geo}>
                        <lineBasicMaterial color="#00A6FF" transparent opacity={0.8} linewidth={2} />
                    </lineSegments>

                    {/* Secondary glow effect - Orange */}
                    <lineSegments geometry={geo}>
                        <lineBasicMaterial color="#FF5E1F" transparent opacity={0.3} linewidth={4} />
                    </lineSegments>
                </group>
            ))}

            {/* Animated road markers along paths */}
            {ROADS.map((road, roadIdx) =>
                road.points.slice(0, -1).map((point, pointIdx) => (
                    <mesh
                        key={`marker-${roadIdx}-${pointIdx}`}
                        position={[point[0], 0.1, point[1]]}
                        scale={[0.3, 0.1, 0.3]}
                    >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color="#B0FF57" transparent opacity={0.6} />
                    </mesh>
                ))
            )}
        </group>
    );
};

const SciFiBase = () => {
    // The "Projector" look at the bottom
    return (
        <group position={[0, -2, 0]}>
            {/* Main Cylinder Base */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[28, 20, 2, 64]} />
                <meshStandardMaterial color="#021014" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Glowing Ring */}
            <mesh position={[0, 2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[26, 27, 64]} />
                <meshBasicMaterial color={THEME.primary} transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Inner Grid Floor */}
            <gridHelper args={[60, 60, THEME.secondary, '#022026']} position={[0, 2.05, 0]} />

            {/* Decorative Outer Rings */}
            <mesh position={[0, 0.5, 0]}>
                <torusGeometry args={[25, 0.5, 16, 100]} />
                <meshStandardMaterial color="#004455" />
            </mesh>
        </group>
    );
};

const HolographicTrees = () => {
    // Use Instances for better performance with many trees
    const count = 80;
    const trees = useMemo(() => {
        const temp = [];
        // Scatter trees around the campus in clusters
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = 8 + Math.random() * 18; // scattered around perimeter and throughout
            const scale = 0.6 + Math.random() * 0.8;
            temp.push({
                position: [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [number, number, number],
                scale: scale,
                colorVariant: Math.floor(Math.random() * 3) // For color variation
            });
        }
        return temp;
    }, []);

    const treeColors = [
        '#B0FF57',    // Lime Green - primary
        '#00A6FF',    // Electric Blue - accent
        '#FF85C0',    // Bubblegum Pink - accent
    ];

    return (
        <group>
            {/* Large cone-shaped holographic trees */}
            {trees.map((data, i) => {
                const treeColor = treeColors[data.colorVariant];
                return (
                    <group key={i} position={data.position}>
                        {/* Main tree cone */}
                        <mesh scale={[data.scale, data.scale * 1.5, data.scale]} castShadow>
                            <coneGeometry args={[0.8, 2, 8]} />
                            <meshPhysicalMaterial
                                color={treeColor}
                                emissive={treeColor}
                                emissiveIntensity={0.4}
                                transparent
                                opacity={0.7}
                                metalness={0.3}
                                roughness={0.6}
                            />
                        </mesh>

                        {/* Glowing tree outline */}
                        <mesh scale={[data.scale * 1.05, data.scale * 1.55, data.scale * 1.05]}>
                            <coneGeometry args={[0.8, 2, 8]} />
                            <meshBasicMaterial
                                color={treeColor}
                                transparent
                                opacity={0.3}
                                wireframe
                            />
                        </mesh>

                        {/* Tree trunk - darker base */}
                        <mesh position={[0, -0.5, 0]} scale={[data.scale * 0.3, data.scale * 0.8, data.scale * 0.3]}>
                            <cylinderGeometry args={[0.4, 0.5, 1, 4]} />
                            <meshStandardMaterial
                                color="#1A1A1A"
                                emissive="#FF5E1F"
                                emissiveIntensity={0.2}
                            />
                        </mesh>
                    </group>
                );
            })}

            {/* Ambient tree particles for depth */}
            <group>
                {trees.slice(0, 20).map((data, i) => (
                    <mesh
                        key={`particle-${i}`}
                        position={[data.position[0], 1 + Math.random() * 2, data.position[2]]}
                        scale={[0.2, 0.2, 0.2]}
                    >
                        <sphereGeometry args={[1, 4, 4]} />
                        <meshBasicMaterial
                            color={treeColors[i % 3]}
                            transparent
                            opacity={0.4}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// --- Main Export ---

export function HolographicMap({ onBuildingHover, onBuildingClick, isLoading = false }: { onBuildingHover: (id: string | null) => void, onBuildingClick: (id: string) => void, isLoading?: boolean }) {
    // Rotation logic to match the "Diamond" orientation in the image
    // The reference image is isometric (Diamond shape). 
    // We rotate the whole content by 45 degrees (Math.PI / 4)

    const [showLabels, setShowLabels] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            // Show labels 0.5s after loading completes
            const timer = setTimeout(() => setShowLabels(true), 500);
            return () => clearTimeout(timer);
        } else {
            setShowLabels(false);
        }
    }, [isLoading]);

    return (
        <group>
            {/* Adjust lighting for Hologram effect */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 20, 10]} intensity={1} color={THEME.primary} distance={50} />
            <pointLight position={[-10, 20, -10]} intensity={0.5} color="#00ffaa" distance={50} />

            {/* Projector Base */}
            <SciFiBase />

            {/* The Map Content - Rotated to form Diamond shape */}
            <group rotation={[0, Math.PI / 4, 0]} position={[0, 0.5, 0]}>

                {/* Ground Plane (Invisible hit target or subtle glow) */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <circleGeometry args={[30, 64]} />
                    <meshBasicMaterial color={THEME.ground} transparent opacity={0.9} />
                </mesh>

                <HoloRoads />
                <HolographicTrees />

                {BUILDINGS.map((building) => (
                    <Building
                        key={building.id}
                        data={building}
                        onHover={onBuildingHover}
                        onClick={onBuildingClick}
                        showLabels={showLabels}
                    />
                ))}

                {/* Street Names floating */}
                <Text
                    position={[-22, 1, 0]}
                    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                    fontSize={1.5}
                    color={THEME.primary}
                >
                    MELA ROAD
                </Text>


            </group>
        </group>
    );
}
