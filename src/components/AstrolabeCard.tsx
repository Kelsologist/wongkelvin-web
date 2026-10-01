import React, { useState, useEffect } from 'react';

export function AstrolabeCard() {
  const [azimuth, setAzimuth] = useState<number>(184.2);
  const [elevation, setElevation] = useState<number>(42.8);
  const [isLocked, setIsLocked] = useState<boolean>(true);

  useEffect(() => {
    if (!isLocked) return;
    const timer = setInterval(() => {
      setAzimuth((prev) => Number((prev + (Math.random() * 0.2 - 0.1)).toFixed(2)));
      setElevation((prev) => Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(2)));
    }, 1500);
    return () => clearInterval(timer);
  }, [isLocked]);

  return (
    <div className="relative overflow-hidden p-5 rounded-[14px] bg-[#14161a]/72 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between h-full hover:border-[#00BFFF]/40 transition-all">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-[10px] font-mono text-[#00BFFF] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${isLocked ? 'bg-[#39FF14] animate-pulse' : 'bg-amber-400'}`} />
          CRYPTOGRAPHIC ASTROLABE
        </span>
        <span className={`text-[9px] font-mono font-bold ${isLocked ? 'text-[#39FF14]' : 'text-amber-400'}`}>
          {isLocked ? 'ORBITAL LOCK' : 'CALIBRATING'}
        </span>
      </div>

      <div className="my-2 relative w-full flex-1 flex flex-col items-center justify-center bg-black/50 rounded-lg border border-white/5 py-4 min-h-[190px] overflow-hidden">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#00BFFF]/40 border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border-2 border-t-[#FF1493] border-r-transparent border-b-[#00BFFF] border-l-transparent animate-[spin_12s_linear_infinite_reverse]" />
          <div className="absolute inset-6 rounded-full border border-[#FFD700]/60 border-dotted animate-[spin_8s_linear_infinite]" />
          <div className="w-10 h-10 rounded-full bg-black/80 border border-[#00BFFF] shadow-[0_0_15px_#00BFFF] flex flex-col items-center justify-center font-mono">
            <span className="text-[7px] text-[#39FF14] font-bold">TSA</span>
            <span className="text-[7px] text-white font-bold">v2.4</span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-4 w-full px-4 text-center font-mono text-[9px] text-slate-400 border-t border-white/5 pt-2">
          <div>AZIMUTH: <strong className="text-white">{azimuth}°</strong></div>
          <div>ELEVATION: <strong className="text-white">{elevation}°</strong></div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-2 flex justify-between items-center font-mono text-[9px]">
        <span className="text-slate-400">EPOCH: 2026.74</span>
        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`px-2.5 py-1 font-bold rounded border transition-all ${
            isLocked
              ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              : 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/30'
          }`}
        >
          {isLocked ? 'RE-CALIBRATE' : 'LOCK TARGET'}
        </button>
      </div>
    </div>
  );
}