import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HolographicGrid() {
    const gridRef = useRef<THREE.Group>(null);

    // Create grid lines
    const gridLines = useMemo(() => {
        const lines: JSX.Element[] = [];
        const gridSize = 20000;
        const gridDivisions = 8000;
        const spacing = gridSize / gridDivisions;

        // Main grid - Purple
        for (let i = -gridDivisions / 2; i <= gridDivisions / 2; i++) {
            const pos = i * spacing;
            const opacity = Math.abs(i) % 5 === 0 ? 0.6 : 0.2;

            // Horizontal lines
            lines.push(
                <line key={`h-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([-gridSize / 2, 0, pos, gridSize / 2, 0, pos])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color="#FF85C0"
                        transparent
                        opacity={opacity}
                        linewidth={1}
                    />
                </line>
            );

            // Vertical lines
            lines.push(
                <line key={`v-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([pos, 0, -gridSize / 2, pos, 0, gridSize / 2])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial
                        color="#B0FF57"
                        transparent
                        opacity={opacity}
                        linewidth={1}
                    />
                </line>
            );
        }

        return lines;
    }, []);

    // Animate grid glow
    useFrame((state) => {
        if (gridRef.current) {
            const time = state.clock.getElapsedTime();
            gridRef.current.children.forEach((child, i) => {
                if (child instanceof THREE.Line) {
                    const material = child.material as THREE.LineBasicMaterial;
                    const baseOpacity = Math.abs(Math.floor((i - 40) / 2)) % 5 === 0 ? 0.6 : 0.2;
                    material.opacity = baseOpacity + Math.sin(time * 2 + i * 0.1) * 0.1;
                }
            });
        }
    });

    return (
        <group ref={gridRef} position={[0, -0.5, 0]}>
            {gridLines}

            {/* Ground plane with dark material */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow castShadow>
                <planeGeometry args={[20000, 20000]} />
                <meshStandardMaterial
                    color="#0A0E27"
                    transparent
                    opacity={0.6}
                    metalness={0.2}
                    roughness={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Subtle grid pattern overlay */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
                <planeGeometry args={[20000, 20000]} />
                <meshBasicMaterial
                    color="#00A6FF"
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Glow ring at center (scaled up) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                {/* OuterRadius, InnerRadius, Segments */}
                <ringGeometry args={[200, 260, 128]} />
                <meshBasicMaterial
                    color="#00A6FF"
                    transparent
                    opacity={0.35}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}
