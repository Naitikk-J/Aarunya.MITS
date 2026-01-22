import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerCharacterProps {
    position: [number, number, number];
    onMove: (newPosition: [number, number, number]) => void;
}

export function PlayerCharacter({ position, onMove }: PlayerCharacterProps) {
    const groupRef = useRef<THREE.Group>(null);
    const trailRef = useRef<THREE.Points>(null);
    const velocity = useRef(new THREE.Vector3());
    const [isMoving, setIsMoving] = useState(false);

    // Movement state
    const keys = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        dash: false,
    });

    // Trail positions
    const trailPositions = useRef<number[]>(new Array(90).fill(0));
    const trailIndex = useRef(0);

    // Setup keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    keys.current.forward = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    keys.current.backward = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    keys.current.left = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    keys.current.right = true;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    keys.current.dash = true;
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW':
                case 'ArrowUp':
                    keys.current.forward = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    keys.current.backward = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    keys.current.left = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    keys.current.right = false;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    keys.current.dash = false;
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const speed = keys.current.dash ? 20 : 10;
        const friction = 0.9;

        // Calculate movement direction
        const moveDirection = new THREE.Vector3();

        if (keys.current.forward) moveDirection.z -= 1;
        if (keys.current.backward) moveDirection.z += 1;
        if (keys.current.left) moveDirection.x -= 1;
        if (keys.current.right) moveDirection.x += 1;

        // Normalize and apply speed
        if (moveDirection.length() > 0) {
            moveDirection.normalize();
            velocity.current.add(moveDirection.multiplyScalar(speed * delta));
            setIsMoving(true);
        } else {
            setIsMoving(false);
        }

        // Apply friction
        velocity.current.multiplyScalar(friction);

        // Update position
        const newPos: [number, number, number] = [
            groupRef.current.position.x + velocity.current.x,
            0.5,
            groupRef.current.position.z + velocity.current.z
        ];

        // Clamp to grid bounds
        newPos[0] = Math.max(-45, Math.min(45, newPos[0]));
        newPos[2] = Math.max(-45, Math.min(45, newPos[2]));

        groupRef.current.position.set(...newPos);
        onMove(newPos);

        // Update trail
        if (velocity.current.length() > 0.01) {
            trailPositions.current[trailIndex.current * 3] = newPos[0];
            trailPositions.current[trailIndex.current * 3 + 1] = newPos[1];
            trailPositions.current[trailIndex.current * 3 + 2] = newPos[2];
            trailIndex.current = (trailIndex.current + 1) % 30;

            if (trailRef.current) {
                const posAttr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
                for (let i = 0; i < 30; i++) {
                    posAttr.setXYZ(
                        i,
                        trailPositions.current[i * 3],
                        trailPositions.current[i * 3 + 1],
                        trailPositions.current[i * 3 + 2]
                    );
                }
                posAttr.needsUpdate = true;
            }
        }

        // Rotate character based on movement
        if (velocity.current.length() > 0.01) {
            const angle = Math.atan2(velocity.current.x, velocity.current.z);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                angle,
                0.1
            );
        }

        // Floating animation
        const time = state.clock.getElapsedTime();
        groupRef.current.position.y = 0.5 + Math.sin(time * 3) * 0.1;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Main body - Cone shape like reference */}
            <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[0.4, 1.2, 8]} />
                <meshStandardMaterial
                    color="#FF5E1F"
                    emissive="#FFDD33"
                    emissiveIntensity={0.8}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>

            {/* Top sphere */}
            <mesh position={[0, 1.3, 0]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                    color="#FF85C0"
                    emissive="#FF5E1F"
                    emissiveIntensity={1}
                />
            </mesh>

            {/* Glow ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                <ringGeometry args={[0.5, 0.7, 32]} />
                <meshBasicMaterial
                    color={isMoving ? "#00A6FF" : "#FF5E1F"}
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer glow */}
            <pointLight
                position={[0, 0.5, 0]}
                intensity={isMoving ? 3 : 1.5}
                distance={5}
                color={isMoving ? "#00A6FF" : "#FF5E1F"}
            />

            {/* Trail particles */}
            <points ref={trailRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={30}
                        array={new Float32Array(trailPositions.current)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#B0FF57"
                    size={0.2}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>
        </group>
    );
}
