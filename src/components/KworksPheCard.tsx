import React, { Suspense, useState, useRef, Component, ReactNode } from 'react';
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

function FallbackKworksModel({ finishColor }: { finishColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.2, 1.4]} />
        <meshStandardMaterial color={finishColor} metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 1.8, 1.1]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
}

interface KworksModelProps {
  finishColor: string;
}

function KworksModel({ finishColor }: KworksModelProps) {
  const { scene } = useGLTF('/assets/engineer_comby-07.glb');
  const modelRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(finishColor),
          metalness: finishColor === '#00458a' ? 0.75 : 0.35,
          roughness: finishColor === '#00458a' ? 0.18 : 0.22,
        });
      }
    });
  }, [scene, finishColor]);

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

export function KworksPheCard() {
  const [finish, setFinish] = useState<'yellow' | 'blue'>('yellow');
  const activeColor = finish === 'yellow' ? '#ffe600' : '#00458a';

  return (
    <div className="relative overflow-hidden p-6 rounded-[16px] bg-[#121418]/88 backdrop-blur-xl border border-[#ffe600]/25 shadow-2xl flex flex-col justify-between w-full text-[#F8F5EE] font-sans">
      
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div>
          <span className="text-[11px] font-mono text-[#ffe600] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffe600] animate-ping" />
            DATA CENTER THERMAL LOOP // KWORKS SYSTEMS
          </span>
          <h1 className="text-lg font-mono font-extrabold text-white mt-1">
            GASKETED PHE // P-SERIES MATRIX
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFinish(finish === 'yellow' ? 'blue' : 'yellow')}
            className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/20 text-slate-200 hover:bg-white/10 transition-colors"
          >
            FINISH: <strong className="text-[#ffe600] uppercase">{finish}</strong>
          </button>
          <span className="text-[10px] font-mono text-[#ffe600] font-bold bg-[#ffe600]/10 border border-[#ffe600]/30 px-2.5 py-1 rounded-full">
            PHE.KWORKS TWIN
          </span>
        </div>
      </div>

      <div className="relative w-full h-[380px] my-3 rounded-xl bg-[#050608] border border-[#ffe600]/30 overflow-hidden shadow-2xl">
        <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffe600] to-transparent shadow-[0_0_15px_#ffe600] animate-pulse z-20 pointer-events-none" />

        <Canvas camera={{ position: [4, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} />
          <directionalLight position={[-6, 4, -6]} color={activeColor} intensity={1.5} />
          <Environment preset="studio" />

          <ModelErrorBoundary fallback={<FallbackKworksModel finishColor={activeColor} />}>
            <Suspense fallback={
              <Html center>
                <div className="font-mono text-xs text-[#ffe600] animate-pulse">
                  LOADING PHE.KWORKS CAD ASSET...
                </div>
              </Html>
            }>
              <KworksModel finishColor={activeColor} />
            </Suspense>
          </ModelErrorBoundary>

          <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={2} far={4} />
          <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-2 font-mono">
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#222630]">
          <div className="text-[10px] text-zinc-500 tracking-wider">SYSTEM BRAND</div>
          <div className="text-xs font-bold text-[#ffe600] mt-0.5">PHE.KWORKS</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#222630]">
          <div className="text-[10px] text-zinc-500 tracking-wider">HEAT DUTY</div>
          <div className="text-xs font-bold text-[#ffe600] mt-0.5">3.2 MW</div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#222630]">
          <div className="text-[10px] text-zinc-500 tracking-wider">FINISH</div>
          <div className="text-xs font-bold text-[#39ff14] mt-0.5 uppercase">
            {finish === 'yellow' ? 'KWORKS YELLOW' : 'METALLIC BLUE'}
          </div>
        </div>
        <div className="bg-[#050608] rounded-lg p-2.5 border border-[#222630]">
          <div className="text-[10px] text-zinc-500 tracking-wider">STAGE</div>
          <div className="text-xs font-bold text-[#ffe600] mt-0.5">EMBOSSED STAGE</div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-3 text-[10px] font-mono text-slate-400">
        <span>Thermal Isolation Circuit: High-Density CDU Loop</span>
        <span className="text-[#ffe600]">KWORKS Proprietary Design</span>
      </div>

    </div>
  );
}
