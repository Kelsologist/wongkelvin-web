Replace the file contents with this formatted, syntax - corrected version:

````tsx
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    ContactShadows,
    Environment,
    Html,
    OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';

function FwgModel() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.2, 0]}>
            {/* Main evaporator / condenser vacuum chamber */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.8, 0.8, 1.8, 32]} />
                <meshStandardMaterial
                    color="#00529b"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Titanium plate pack core */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1.2, 1.2, 0.9]} />
                <meshStandardMaterial
                    color="#c0c0c0"
                    metalness={0.9}
                    roughness={0.15}
                />
            </mesh>

            {/* Distillate water sight glass / glow tube */}
            <mesh position={[0, -0.4, 0.7]}>
                <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
                <meshStandardMaterial
                    color="#00fff2"
                    emissive="#00fff2"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Ejector and vacuum pipe flanges */}
            <mesh
                position={[0.7, 0.8, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
                <meshStandardMaterial
                    color="#39ff14"
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            <mesh
                position={[-0.7, 0.8, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
                <meshStandardMaterial
                    color="#ff1493"
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>
        </group>
    );
}

export function FreshwaterGeneratorCard() {
    const [salinity] = useState(42);
    const [isPumpActive, setIsPumpActive] = useState(true);

    return (
        <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-[16px] border border-[#00fff2]/25 bg-[#121418]/88 p-6 font-sans text-[#F8F5EE] shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#00fff2]">
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${isPumpActive ? 'animate-ping bg-[#00fff2]' : 'bg-amber-400'
                                }`}
                        />
                        FRESHWATER GENERATOR (FWG) // VACUUM DISTILLATION
                    </span>
                    <h1 className="mt-1 font-mono text-lg font-extrabold text-white">
                        TITANIUM PLATE EVAPORATOR
                    </h1>
                </div>

                <span className="rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-2.5 py-1 font-mono text-[10px] font-bold text-[#39FF14]">
                    FWG DIGITAL TWIN
                </span>
            </div>

            {/* 3D viewport */}
            <div className="relative my-3 h-[380px] w-full overflow-hidden rounded-xl border border-[#00fff2]/30 bg-[#050608] shadow-2xl">
                <div className="pointer-events-none absolute inset-x-0 z-20 h-[3px] animate-pulse bg-gradient-to-r from-transparent via-[#00fff2] to-transparent shadow-[0_0_15px_#00fff2]" />

                <Canvas camera={{ position: [4, 3, 6], fov: 45 }}>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[4, 7, 4]} intensity={1.8} />
                    <directionalLight
                        position={[-6, 4, -6]}
                        color="#00fff2"
                        intensity={1.2}
                    />
                    <Environment preset="studio" />

                    <Suspense
                        fallback={
                            <Html center>
                                <div className="animate-pulse font-mono text-xs text-[#00fff2]">
                                    INITIALIZING FWG VACUUM TWIN...
                                </div>
                            </Html>
                        }
                    >
                        <FwgModel />
                        <ContactShadows
                            position={[0, -1.2, 0]}
                            opacity={0.6}
                            scale={10}
                            blur={2}
                            far={4}
                        />
                    </Suspense>

                    <OrbitControls enableDamping dampingFactor={0.05} />
                </Canvas>
            </div>

            {/* Telemetry specs */}
            <div className="mt-2 grid w-full grid-cols-2 gap-3 font-mono sm:grid-cols-4">
                <div className="rounded-lg border border-[#1f293d] bg-[#050608] p-2.5">
                    <div className="text-[10px] tracking-wider text-zinc-500">CAPACITY</div>
                    <div className="mt-0.5 text-xs font-bold text-[#00fff2]">
                        25.0 TONS / DAY
                    </div>
                </div>

                <div className="rounded-lg border border-[#1f293d] bg-[#050608] p-2.5">
                    <div className="text-[10px] tracking-wider text-zinc-500">
                        VACUUM PRESSURE
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-[#39ff14]">
                        -0.95 BAR
                    </div>
                </div>

                <div className="rounded-lg border border-[#1f293d] bg-[#050608] p-2.5">
                    <div className="text-[10px] tracking-wider text-zinc-500">SALINITY</div>
                    <div className="mt-0.5 text-xs font-bold text-[#00fff2]">
                        {salinity} PPM (PURE H2O)
                    </div>
                </div>

                <div className="rounded-lg border border-[#1f293d] bg-[#050608] p-2.5">
                    <div className="text-[10px] tracking-wider text-zinc-500">HEAT SOURCE</div>
                    <div className="mt-0.5 text-xs font-bold text-[#ff1493]">
                        85°C JACKET WATER
                    </div>
                </div>
            </div>

            {/* Controls and footer */}
            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[10px] text-slate-400">
                <span>Distillate Quality: High Purity Potable Grade</span>
                <button
                    onClick={() => setIsPumpActive((active) => !active)}
                    className={`rounded border px-3 py-1 font-bold transition-all ${isPumpActive
                        ? 'border-[#00fff2] bg-[#00fff2]/10 text-[#00fff2] hover:bg-[#00fff2]/20'
                        : 'border-amber-400 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20'
                        }`}
                >
                    EJECTOR PUMP: {isPumpActive ? 'RUNNING' : 'STANDBY'}
                </button>
            </div>
        </div>
    );
}
````