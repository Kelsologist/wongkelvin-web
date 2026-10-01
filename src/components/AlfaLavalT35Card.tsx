import React, { Suspense, useRef, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

interface EBProps { fallback: ReactNode; children: ReactNode; }
interface EBState { hasError: boolean; }
class ModelErrorBoundary extends Component<EBProps, EBState> {
  public state: EBState = { hasError: false };
  public static getDerivedStateFromError(): EBState { return { hasError: true }; }
  public componentDidCatch(err: Error) { console.warn('GLTF load error fallback activated:', err); }
  public render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function FallbackAlfaLavalModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.2, 1.4]} />
        <meshStandardMaterial color="#00458a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 1.8, 1.1]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

function AlfaLavalModel() {
  const { scene } = useGLTF('/assets/alfa_laval_t35.glb');
  const modelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.2, 0]}>
      <primitive object={scene} scale={1.8} />
    </group>
  );
}

export function AlfaLavalT35Card() {
  return (
    <div className="relative overflow-hidden p-6 rounded-[16px] bg-[#121418]/88 backdrop-blur-xl border border-[#00f0ff]/25 shadow-2xl flex flex-col justify-between w-full text-[#F8F5EE] font-sans">
      
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div>
          <span className="text-[11px] font-mono text-[#00f0ff] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
            DATA CENTER THERMAL LOOP // ALFA LAVAL T35
          </span>
          <h1 className="text-lg font-mono font-extrabold text-white mt-1">
            GASKETED PHE // DIGITAL TWIN
          </h1>
        </div>
        <span className="text-[10px] font-mono text-[#39FF14] font-bold bg-[#39FF14]/10 border border-[#39FF14]/30 px-2.5 py-1 rounded-full">
          ALFA LAVAL TWIN
        </span>
      </div>

      <div className="relative w-full h-[380px] my-3 rounded-xl bg-[#050608] border border-[#00f0ff]/30 overflow-hidden shadow-2xl">
        <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff] animate-pulse z-20 pointer-events-none" />

        <Canvas camera={{ position: [4, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-6, 4, -6]} color="#00f0ff" intensity={1.2} />
          <Environment preset="studio" />

          <ModelErrorBoundary fallback={<FallbackAlfaLavalModel />}>
            <Suspense fallback={
              <Html center>
                <div className="font-mono text-xs text-[#00f0ff] animate-pulse">
                  LOADING ALFA LAVAL CAD ASSET...
                </div>
              </Html>
            }>
              <AlfaLavalModel />
            </Suspense>
          </ModelErrorBoundary>
          
          <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2} far={4} />
          <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-2 font-mono">
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">MODEL</div>
          <div className="text-xs font-bold text-[#00f0ff] mt-0.5">ALFA LAVAL T35</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">HEAT DUTY</div>
          <div className="text-xs font-bold text-[#39ff14] mt-0.5">3.2 MW</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">FRAME COATING</div>
          <div className="text-xs font-bold text-[#00f0ff] mt-0.5">METALLIC BLUE</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#1f293d]">
          <div className="text-[10px] text-zinc-500 tracking-wider">PLATES</div>
          <div className="text-xs font-bold text-[#39ff14] mt-0.5">SILVER HONEYCOMB</div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-3 text-[10px] font-mono text-slate-400">
        <span>Thermal Isolation Circuit: Server CDU Loop</span>
        <span className="text-[#39ff14]">AHRI LLHE Certified</span>
      </div>

    </div>
  );
}
