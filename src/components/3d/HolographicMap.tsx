import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface MapBuilding {
  id: string;
  name: string;
  hindiName: string;
  position: [number, number];
  size: [number, number];
  height: number;
  icon?: string;
  section?: string;
}

// Campus buildings based on the reference map layout
const CAMPUS_BUILDINGS: MapBuilding[] = [
  { id: 'main-gate', name: 'MITS Main Gate', hindiName: 'एमआईटीएस मेन गेट', position: [0, 12], size: [4, 2], height: 0.8, icon: '🎓' },
  { id: 'idbi-atm', name: 'IDBI Bank ATM', hindiName: 'आई.डी.बी.आई. बैंक ए.टी.एम', position: [8, 14], size: [2, 2], height: 0.5, icon: '🏧' },
  { id: 'biotech', name: 'Dept of Biotechnology', hindiName: 'जैव प्रौद्योगिकी विभाग', position: [10, 6], size: [5, 4], height: 1.2 },
  { id: 'medical', name: 'MITS Medical Dispensary', hindiName: 'एमआईटीएस मेडिकल डिस्पेंसरी', position: [14, 4], size: [4, 3], height: 1, icon: 'H' },
  { id: 'civil-dept', name: 'Department of Civil Engineering', hindiName: 'सिविल इंजीनियरिंग विभाग', position: [2, 0], size: [8, 6], height: 1.5 },
  { id: 'golden-garden', name: 'Golden Jubilee Garden MITS', hindiName: 'गोल्डन जुबिली गार्डन एमआईटीएस', position: [8, -4], size: [6, 4], height: 0.3, icon: '🌳' },
  { id: 'library', name: 'MITS Library', hindiName: 'एमआईटीएस लाइबरी', position: [-8, -2], size: [5, 4], height: 1.3, icon: '📚' },
  { id: 'canteen', name: 'MITS Canteen', hindiName: 'एमआईटीएस कैंटीन', position: [-6, 2], size: [4, 3], height: 0.8, icon: '🍽️' },
  { id: 'shivji-mandir', name: 'Shivji Mandir', hindiName: 'शिवजी मंदिर', position: [-10, 4], size: [3, 3], height: 1, icon: 'ॐ' },
  { id: 'union-bank', name: 'Union Bank of India', hindiName: 'यूनियन बैंक ऑफ इंडिया', position: [-14, 6], size: [3, 2], height: 0.6, icon: '🏦' },
  { id: 'architecture', name: 'Department of Architecture', hindiName: 'वास्तुकला विभाग', position: [0, -10], size: [7, 5], height: 1.4 },
  { id: 'diamond-gate', name: 'Diamond Jubilee Gate, MITS', hindiName: 'डायमंड जुबिली गेट, एमआईटीएस', position: [4, -16], size: [4, 2], height: 0.8, icon: '💎' },
  { id: 'mits-main', name: 'Madhav Institute of Technology & Science', hindiName: 'माधव इंस्टिट्यूट ऑफ टेक्नोलॉजी एंड साइंस', position: [14, -10], size: [6, 4], height: 1.6, icon: '🏛️' },
];

// Road paths connecting buildings
const ROADS: Array<{ start: [number, number]; end: [number, number]; width: number }> = [
  // Main horizontal roads
  { start: [-20, 12], end: [20, 12], width: 0.4 },
  { start: [-20, 6], end: [20, 6], width: 0.3 },
  { start: [-20, 0], end: [20, 0], width: 0.4 },
  { start: [-20, -6], end: [20, -6], width: 0.3 },
  { start: [-20, -12], end: [20, -12], width: 0.4 },
  { start: [-20, -18], end: [20, -18], width: 0.4 },
  // Main vertical roads
  { start: [-16, -20], end: [-16, 16], width: 0.4 },
  { start: [-8, -20], end: [-8, 16], width: 0.3 },
  { start: [0, -20], end: [0, 16], width: 0.4 },
  { start: [8, -20], end: [8, 16], width: 0.3 },
  { start: [16, -20], end: [16, 16], width: 0.4 },
  // Diagonal connector
  { start: [-16, 16], end: [16, 16], width: 0.5 },
];

interface HolographicMapProps {
  onBuildingHover: (building: string | null) => void;
  onBuildingClick: (building: string) => void;
}

function MapBuilding({ 
  building, 
  onHover, 
  onClick 
}: { 
  building: MapBuilding; 
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Subtle floating animation
      meshRef.current.position.y = building.height / 2 + 0.1 + Math.sin(time * 1.5 + building.position[0]) * 0.05;
      
      if (hovered) {
        meshRef.current.position.y += 0.2;
      }
    }
  });

  return (
    <group position={[building.position[0], 0, building.position[1]]}>
      {/* Building base glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[building.size[0] + 0.5, building.size[1] + 0.5]} />
        <meshBasicMaterial 
          color="#00f3ff"
          transparent
          opacity={hovered ? 0.4 : 0.15}
        />
      </mesh>
      
      {/* Building mesh */}
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
        <boxGeometry args={[building.size[0], building.height, building.size[1]]} />
        <meshStandardMaterial
          color={hovered ? "#00ccff" : "#0d4f5a"}
          transparent
          opacity={0.9}
          emissive="#00f3ff"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* Building top highlight */}
      <mesh position={[0, building.height + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[building.size[0] - 0.1, building.size[1] - 0.1]} />
        <meshBasicMaterial 
          color="#00ffff"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Wireframe outline */}
      <lineSegments position={[0, building.height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(building.size[0], building.height, building.size[1])]} />
        <lineBasicMaterial color="#00f3ff" transparent opacity={hovered ? 1 : 0.6} />
      </lineSegments>
      
      {/* Floating label */}
      <Html
        position={[0, building.height + 1.5, 0]}
        center
        distanceFactor={8}
        style={{
          transition: 'all 0.2s',
          opacity: hovered ? 1 : 0.9,
          transform: `scale(${hovered ? 1.1 : 1})`,
          pointerEvents: 'none',
        }}
      >
        <div 
          className="px-2 py-1 rounded text-center whitespace-nowrap"
          style={{
            background: 'rgba(0, 30, 40, 0.9)',
            border: '1px solid #00f3ff',
            boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)',
          }}
        >
          {building.icon && (
            <span className="mr-1">{building.icon}</span>
          )}
          <span className="font-orbitron text-xs font-bold text-primary">
            {building.name}
          </span>
          <div className="font-rajdhani text-[10px] text-muted-foreground">
            {building.hindiName}
          </div>
        </div>
      </Html>
    </group>
  );
}

function NeonRoad({ start, end, width }: { start: [number, number]; end: [number, number]; width: number }) {
  const length = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2));
  const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
  const midX = (start[0] + end[0]) / 2;
  const midZ = (start[1] + end[1]) / 2;
  
  return (
    <mesh 
      position={[midX, 0.05, midZ]} 
      rotation={[0, -angle + Math.PI / 2, 0]}
    >
      <planeGeometry args={[width, length]} />
      <meshBasicMaterial 
        color="#00f3ff"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function MapPedestal() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[28, 30, 2, 64]} />
        <meshStandardMaterial
          color="#062830"
          metalness={0.8}
          roughness={0.2}
          emissive="#003040"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Glowing ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.1, 0]}>
        <ringGeometry args={[26, 27, 64]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.1, 0]}>
        <ringGeometry args={[24, 25, 64]} />
        <meshBasicMaterial color="#00ccff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Decorative outer segments */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh 
          key={i}
          rotation={[-Math.PI / 2, 0, (i * Math.PI) / 4]}
          position={[Math.cos((i * Math.PI) / 4) * 29, 0.5, Math.sin((i * Math.PI) / 4) * 29]}
        >
          <boxGeometry args={[2, 0.5, 1]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function MapGround() {
  return (
    <group>
      {/* Main ground plane - teal colored like reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[25, 64]} />
        <meshStandardMaterial
          color="#0a3d47"
          metalness={0.4}
          roughness={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Grid overlay */}
      <gridHelper 
        args={[50, 50, '#00f3ff', '#004455']} 
        position={[0, 0.01, 0]}
      />
      
      {/* Road labels around edges */}
      <RoadLabel text="Racecourse Rd" position={[0, 0.1, 18]} rotation={0} />
      <RoadLabel text="Mela Rd" position={[-18, 0.1, 8]} rotation={Math.PI / 2} />
      <RoadLabel text="Sun City Rd" position={[0, 0.1, -18]} rotation={0} />
    </group>
  );
}

function RoadLabel({ text, position, rotation }: { text: string; position: [number, number, number]; rotation: number }) {
  return (
    <Text
      position={position}
      rotation={[-Math.PI / 2, 0, rotation]}
      fontSize={1}
      color="#00f3ff"
      anchorX="center"
      anchorY="middle"
      font="/fonts/orbitron.woff"
    >
      {text}
    </Text>
  );
}

import { useState } from 'react';

export function HolographicMap({ onBuildingHover, onBuildingClick }: HolographicMapProps) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Pedestal base */}
      <MapPedestal />
      
      {/* Ground plane */}
      <MapGround />
      
      {/* Roads */}
      {ROADS.map((road, i) => (
        <NeonRoad key={i} start={road.start} end={road.end} width={road.width} />
      ))}
      
      {/* Buildings */}
      {CAMPUS_BUILDINGS.map((building) => (
        <MapBuilding
          key={building.id}
          building={building}
          onHover={onBuildingHover}
          onClick={onBuildingClick}
        />
      ))}
      
      {/* Ambient glow particles */}
      <pointLight position={[0, 10, 0]} intensity={1} color="#00f3ff" distance={40} />
    </group>
  );
}
