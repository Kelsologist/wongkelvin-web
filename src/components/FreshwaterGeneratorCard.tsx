import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

function FwgModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 1.8, 32]} />
        <meshStandardMaterial color="#00529b" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.9]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.15} />
      </mesh>

      <mesh position={[0, -0.4, 0.7]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#00fff2" emissive="#00fff2" emissiveIntensity={0.6} transparent opacity={0.85} />
      </mesh>

      <mesh position={[0.7, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#39ff14" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.7, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#ff1493" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function FreshwaterGeneratorCard() {
  const [salinity] = useState<number>(0.8);
  const [isPumpActive, setIsPumpActive] = useState<boolean>(true);

  return (
    <div className="relative overflow-hidden p-6 rounded-[16px] bg-[#121418]/88 backdrop-blur-xl border border-[#00fff2]/25 shadow-2xl flex flex-col justify-between w-full text-[#F8F5EE] font-sans">
      
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div>
          <span className="text-[11px] font-mono text-[#00fff2] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPumpActive ? 'bg-[#00fff2] animate-ping' : 'bg-amber-400'}`} />
            FRESHWATER GENERATOR (FWG) // VACUUM DISTILLATION
          </span>
          <h1 className="text-lg font-mono font-extrabold text-white mt-1">
            TITANIUM PLATE EVAPORATOR
          </h1>
        </div>

        <span className="text-[10px] font-mono text-[#39FF14] font-bold bg-[#39FF14]/10 border border-[#39FF14]/30 px-2.5 py-1 rounded-full">
          FWG DIGITAL TWIN
        </span>
      </div>

      <div className="relative w-full h-[380px] my-3 rounded-xl bg-[#050608] border border-[#00fff2]/30 overflow-hidden shadow-2xl">
        <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#00fff2] to-transparent shadow-[0_0_15px_#00fff2] animate-pulse z-20 pointer-events-none" />

        <Canvas camera={{ position: [4, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 5]} intensity={1.8} />
          <directionalLight position={[-6, 4, -6]} color="#00fff2" intensity={1.2} />
          <Environment preset="studio" />

          <Suspense fallback={
            <Html center>
              <div className="font-mono text-xs text-[#00fff2] animate-pulse">
                INITIALIZING FWG VACUUM TWIN...
              </div>
            </Html>
          }>
            <FwgModel />
            <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2} far={4} />
          </Suspense>

          <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-2 font-mono">
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">CAPACITY</div>
          <div className="text-xs font-bold text-[#00fff2] mt-0.5">25.0 TONS / DAY</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">VACUUM PRESSURE</div>
          <div className="text-xs font-bold text-[#39ff14] mt-0.5">-0.95 BAR</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">SALINITY</div>
          <div className="text-xs font-bold text-[#00fff2] mt-0.5">{salinity} PPM (PURE H2O)</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">HEAT SOURCE</div>
          <div className="text-xs font-bold text-[#ff1493] mt-0.5">85°C JACKET WATER</div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-3 text-[10px] font-mono text-slate-400">
        <span>Distillate Quality: High Purity Potable Grade</span>
        <button
          onClick={() => setIsPumpActive(!isPumpActive)}
          className={`px-3 py-1 font-bold rounded border transition-all ${
            isPumpActive
              ? 'bg-[#00fff2]/10 border-[#00fff2] text-[#00fff2] hover:bg-[#00fff2]/20'
              : 'bg-amber-400/10 border-amber-400 text-amber-400 hover:bg-amber-400/20'
          }`}
        >
          EJECTOR PUMP: {isPumpActive ? 'RUNNING' : 'STANDBY'}
        </button>
      </div>

    </div>
  );
}