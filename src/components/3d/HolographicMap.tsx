import React, { useRef, useMemo, useState } from 'react';
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

// --- Configuration ---
const THEME = {
    primary: '#00f3ff',     // Bright Cyan
    secondary: '#006d77',   // Deep Teal
    ground: '#04181b',      // Very Dark Teal/Black
    glow: '#00ffff',
    glassOpacity: 0.15,
    edgeOpacity: 0.8
};

// --- Data: Mapped to the Diamond Layout ---
// The map is rotated 45deg. 
const BUILDINGS: BuildingData[] = [
    // Top Corner
    { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'मुख्य द्वार', position: [5, -25], size: [4, 2], height: 2, type: 'landmark', icon: '🎓' },

    // Left Wing (Civil/Canteen area)
    { id: 'old building', name: 'Old Building', hindiName: 'सिविल विभाग', position: [-6,-10], size: [16, 7], height: 2.5, type: 'complex' },
    { id: 'canteen', name: 'Canteen', hindiName: 'कैंटीन', position: [-15, -12], size: [4, 4], height: 1.5, type: 'simple', icon: '🍽️' },
    { id: 'AI department', name: 'AI department', hindiName: 'कैंटीन', position: [-3, 4], size: [9, 5], height: 6, type: 'simple', icon: '🍽️' },
    { id: 'library', name: 'Central Library', hindiName: 'पुस्तकालय', position: [-7,-16], size: [4, 3], height: 3, type: 'complex', icon: '📚' },

    // Center
    { id: 'golden-garden', name: 'stage ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, -22], size: [15, 6], height: 0.2, type: 'landmark', color: '#00ffaa' },
    { id: 'golden-garden', name: 'AI ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-3, -2], size: [9, 7], height: 0.2, type: 'landmark', color: '#00ffaa' },
    { id: 'golden-garden', name: 'statue ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [15, -18.5], size: [10, 10], height: 0.2, type: 'landmark', color: '#00ffaa' },
    { id: 'golden-garden', name: 'football ground', hindiName: 'गोल्डन जुबिली गार्डन', position: [-5, 22], size: [30, 15], height: 0.2, type: 'landmark', color: '#00ffaa' },

    // Right Wing (Biotech/Medical)
    { id: 'biotech', name: 'Biotech Dept', hindiName: 'जैव प्रौद्योगिकी', position: [15,-11], size: [5, 5], height: 2.5, type: 'simple' },
    { id: 'dispensary', name: 'Dispensary', hindiName: 'औषधालय', position: [15, -4] , size: [4, 4], height: 1.5, type: 'simple', icon: 'H' },

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
];

// --- Components ---

/**
 * Procedural Holographic Material
 * Gives that transparent, glassy, glowing edge look
 */
const HoloMaterial = ({ hovered, color = THEME.primary }: { hovered: boolean, color?: string }) => (
    <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.8 : 0.15}
        roughness={0.1}
        metalness={0.9}
        transmission={0.6} // Glass effect
        thickness={2}
        transparent
        opacity={hovered ? 0.6 : THEME.glassOpacity}
        side={THREE.DoubleSide}
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

const Building = ({ data, onHover, onClick }: { data: BuildingData, onHover: any, onClick: any }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Create specific geometries based on "type" to mimic the satellite map shapes
    const geometry = useMemo(() => {
        if (data.type === 'complex') {
            // Creates a hollow-ish building (Courtyard style)
            const shape = new THREE.Shape();
            const w = data.size[0] / 2;
            const h = data.size[1] / 2;

            // Outer rectangle
            shape.moveTo(-w, -h);
            shape.lineTo(w, -h);
            shape.lineTo(w, h);
            shape.lineTo(-w, h);
            shape.lineTo(-w, -h);

            // Inner hole (Courtyard)
            const holePath = new THREE.Path();
            const pad = 0.8;
            holePath.moveTo(-w + pad, -h + pad);
            holePath.lineTo(w - pad, -h + pad);
            holePath.lineTo(w - pad, h - pad);
            holePath.lineTo(-w + pad, h - pad);
            holePath.lineTo(-w + pad, -h + pad);
            shape.holes.push(holePath);

            return new THREE.ExtrudeGeometry(shape, { depth: data.height, bevelEnabled: false });
        } else if (data.id === 'main-gate' || data.id === 'diamond-gate') {
            // Archway shape
            return new THREE.TorusGeometry(data.size[0] / 3, 0.2, 8, 20, Math.PI);
        }
        // Default Box
        return new THREE.BoxGeometry(data.size[0], data.height, data.size[1]);
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

            {/* Hover Label */}
            {hovered && (
                <Html position={[0, data.height + 2, 0]} center distanceFactor={15} zIndexRange={[100, 0]}>
                    <div style={{
                        background: 'rgba(2, 44, 51, 0.9)',
                        border: '1px solid #00f3ff',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        color: '#fff',
                        fontFamily: 'Orbitron, sans-serif',
                        textAlign: 'center',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)'
                    }}>
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#00f3ff' }}>{data.name}</div>
                        <div style={{ fontSize: '0.8em', color: '#aaa' }}>{data.hindiName}</div>
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
            {lines.map((geo, i) => (
                <lineSegments key={i} geometry={geo}>
                    <lineBasicMaterial color={THEME.primary} transparent opacity={0.5} linewidth={1} />
                </lineSegments>
            ))}
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
    const count = 50;
    const trees = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = 10 + Math.random() * 15; // scattered around
            temp.push({
                position: [Math.cos(angle) * r, 0, Math.sin(angle) * r] as [number, number, number],
                scale: 0.5 + Math.random() * 0.5
            });
        }
        return temp;
    }, []);

    return (
        <Instances range={count}>
            <coneGeometry args={[0.5, 1.5, 4]} />
            <meshBasicMaterial color="#00ffaa" transparent opacity={0.2} wireframe />
            {trees.map((data, i) => (
                <Instance key={i} position={data.position} scale={[data.scale, data.scale, data.scale]} />
            ))}
        </Instances>
    );
};

// --- Main Export ---

export function HolographicMap({ onBuildingHover, onBuildingClick }: { onBuildingHover: (id: string | null) => void, onBuildingClick: (id: string) => void }) {
    // Rotation logic to match the "Diamond" orientation in the image
    // The reference image is isometric (Diamond shape). 
    // We rotate the whole content by 45 degrees (Math.PI / 4)

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
