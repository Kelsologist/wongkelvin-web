export function ArcReactorCard() {
  const [isOverdrive, setIsOverdrive] = useState<boolean>(false);
  const [powerLevel, setPowerLevel] = useState<number>(100);

  const handleToggleCore = () => {
    setIsOverdrive((prev) => !prev);
    setPowerLevel(isOverdrive ? 100 : 300);
  };

  return (
    <div className="relative overflow-hidden p-5 rounded-[14px] bg-[#14161a]/72 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between h-full transition-all duration-300 hover:border-[#00BFFF]/40">

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-[10px] font-mono text-[#00BFFF] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${isOverdrive ? 'bg-[#FF1493] animate-ping' : 'bg-[#00BFFF]'}`} />
          ARC REACTOR CORE
        </span>
        <span className="text-[9px] font-mono text-slate-400">
          STATUS: <strong className={isOverdrive ? 'text-[#FF1493]' : 'text-[#39FF14]'}>
            {isOverdrive ? 'OVERDRIVE' : 'NOMINAL'}
          </strong>
        </span>
      </div>

      {/* --- VISUAL ANIMATED CORE --- */}
      <div className="my-4 flex flex-col items-center justify-center relative py-6 bg-black/40 rounded-lg border border-white/5">

        {/* Outer Ring */}
        <div className={`w-32 h-32 rounded-full border-2 ${isOverdrive ? 'border-[#FF1493] shadow-[0_0_25px_#FF1493]' : 'border-[#00BFFF] shadow-[0_0_20px_#00BFFF]'} flex items-center justify-center relative transition-all duration-500`}>

          {/* Rotating Ring Segment */}
          <div className={`absolute inset-1 rounded-full border-2 border-dashed ${isOverdrive ? 'border-amber-400 animate-[spin_2s_linear_infinite]' : 'border-cyan-300 animate-[spin_6s_linear_infinite]'}`} />

          {/* Inner Ring */}
          <div className={`w-20 h-20 rounded-full border ${isOverdrive ? 'border-amber-300 bg-[#FF1493]/20' : 'border-[#00BFFF] bg-[#00BFFF]/10'} flex items-center justify-center shadow-inner`}>

            {/* Core Center Pulse */}
            <div className={`w-10 h-10 rounded-full ${isOverdrive ? 'bg-amber-300 shadow-[0_0_25px_#FFF]' : 'bg-[#00BFFF] shadow-[0_0_15px_#00BFFF]'} animate-pulse flex items-center justify-center`}>
              <span className="text-[8px] font-mono font-bold text-black">{powerLevel}%</span>
            </div>
          </div>
        </div>

        {/* Telemetry Output */}
        <div className="mt-4 text-center space-y-1 font-mono">
          <div className="text-[10px] text-slate-300">
            FLUX DENSITY: <span className="text-white font-bold">{isOverdrive ? '1.21 GW' : '3.14 MW'}</span>
          </div>
          <div className="text-[8px] text-slate-500">
            CONTAINMENT FIELD: {isOverdrive ? 'WARNING (92% CAPACITY)' : 'STABLE (100%)'}
          </div>
        </div>
      </div>

      {/* --- CONTROLS --- */}
      <div className="border-t border-white/5 pt-2 flex justify-between items-center">
        <span className="text-[9px] font-mono text-slate-400">PULSE FREQ: 60Hz</span>
        <button
          onClick={handleToggleCore}
          className={`px-3 py-1 text-[10px] font-mono font-bold rounded border transition-all ${isOverdrive
            ? 'bg-[#FF1493]/20 border-[#FF1493] text-[#FF1493] hover:bg-[#FF1493]/30'
            : 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/30'
            }`}
        >
          {isOverdrive ? 'STABILIZE CORE' : 'ENGAGE OVERDRIVE'}
        </button>
      </div>

    </div>
  );
}


