"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function CrystalScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]} // Cap DPR at 1.5 to save GPU load on high-res screens
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}

function SceneContent() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} color="#00F5FF" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#7000FF" />

            {/* Floating Crystal Core */}
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8} floatingRange={[-0.2, 0.2]}>
                <Crystal />
            </Float>

            {/* Background Particles or additional subtle elements can go here */}
            <Environment preset="city" />
        </>
    );
}

function Crystal() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.15;
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} scale={3.5} position={[3, 0, -2]}>
            <icosahedronGeometry args={[1, 0]} /> {/* Reduced geometry detail from 1 to 0 */}
            <MeshTransmissionMaterial
                backside={false} // Disabled backside for performance
                thickness={2}
                chromaticAberration={0.4}
                anisotropy={0.1} // Reduced anisotropy
                distortion={0.4}
                distortionScale={0.4}
                temporalDistortion={0.2}
                ior={1.2}
                color="#ffffff"
                background={new THREE.Color("#050505")}
                resolution={512} // Cap resolution buffer
                samples={6} // Reduced samples
            />
        </mesh>
    );
}
