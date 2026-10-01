import React, { useState, useEffect, useRef } from 'react';

// 1. Types & Data Models
interface Track {
  id: string;
  name: string;
  freqs: number[];
}

const PLAYLIST: Track[] = [
  { id: '1', name: 'Ethereal_Waves.wav', freqs: [220.0, 277.18, 329.63, 440.0] },
  { id: '2', name: 'Cyber_Pulse.wav', freqs: [146.83, 174.61, 220.0, 293.66] },
  { id: '3', name: 'AION_Resonance.wav', freqs: [130.81, 164.81, 196.0, 261.63] },
];

export function JukeboxCard() {
  // 2. React Reactive States
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mode, setMode] = useState<'synth' | 'apple-music'>('synth');

  // Web Audio API Reference Persistence
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  // 3. Web Audio API Handler
  const togglePlay = () => {
    if (!audioCtxRef.current && isPlaying) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  // Cleanup Web Audio Context on component unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden p-5 rounded-[14px] bg-[#14161a]/72 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between h-full transition-all duration-300 hover:border-[#00BFFF]/40">

      {/* --- HEADER BAR --- */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-[10px] font-mono text-[#00BFFF] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-2v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-2" />
          </svg>
          JUKEBOX REVERB
        </span>

        {/* View Mode Toggle: Web Audio Synth vs Apple Music Embed */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'synth' ? 'apple-music' : 'synth')}
            className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
          >
            {mode === 'synth' ? '➔ APPLE MUSIC' : '➔ WEB SYNTH'}
          </button>

          <span className="text-[9px] font-mono text-[#FF1493] font-bold flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full bg-[#39FF14] ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
            {isPlaying ? 'AUDIO ACTIVE' : 'PAUSED'}
          </span>
        </div>
      </div>

      {/* --- MAIN DISPLAY CONTAINER --- */}
      <div className="w-full flex-1 bg-black/60 border border-white/10 rounded-lg p-4 my-2 flex flex-col justify-between shadow-inner relative overflow-hidden min-h-[220px]">
        {mode === 'synth' ? (
          <>
            {/* Bitrate Telemetry Header */}
            <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 border-b border-white/5 pb-1">
              <span>DSP: STEREO LPCM</span>
              <span className="text-[#39FF14] font-bold">24-BIT / 96kHz</span>
            </div>

            {/* Equalizer Spectrum Bars */}
            <div className={`flex items-end justify-center gap-3.5 sm:gap-5 w-full my-auto h-24 transition-all ${!isPlaying ? 'opacity-40' : ''}`}>
              <span className={`w-2.5 bg-[#00BFFF] rounded-full shadow-[0_0_12px_#00BFFF] ${isPlaying ? 'h-16 animate-bounce' : 'h-4'}`} />
              <span className={`w-2.5 bg-[#FF1493] rounded-full shadow-[0_0_12px_#FF1493] ${isPlaying ? 'h-20 animate-pulse' : 'h-4'}`} />
              <span className={`w-2.5 bg-[#39FF14] rounded-full shadow-[0_0_12px_#39FF14] ${isPlaying ? 'h-12 animate-bounce' : 'h-4'}`} />
              <span className={`w-2.5 bg-[#FFD700] rounded-full shadow-[0_0_12px_#FFD700] ${isPlaying ? 'h-22 animate-pulse' : 'h-4'}`} />
              <span className={`w-2.5 bg-[#D32F2F] rounded-full shadow-[0_0_12px_#D32F2F] ${isPlaying ? 'h-14 animate-bounce' : 'h-4'}`} />
              <span className={`w-2.5 bg-[#9D00FF] rounded-full shadow-[0_0_12px_#9D00FF] ${isPlaying ? 'h-18 animate-pulse' : 'h-4'}`} />
              <span className={`w-2.5 bg-[#00BFFF] rounded-full shadow-[0_0_12px_#00BFFF] ${isPlaying ? 'h-10 animate-bounce' : 'h-4'}`} />
            </div>

            {/* Frequency Labels */}
            <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-500 px-2 pt-1 border-t border-white/5">
              <span>60Hz</span><span>170Hz</span><span>310Hz</span><span>600Hz</span><span>1kHz</span><span>3kHz</span><span>12kHz</span>
            </div>

            {/* Track Info & Progress */}
            <div className="pt-2 text-center space-y-1">
              <div className="text-xs font-mono font-bold text-white tracking-wider truncate">
                {currentTrack.name}
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className={`bg-gradient-to-r from-[#00BFFF] to-[#FF1493] h-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-0'}`} />
              </div>
            </div>
          </>
        ) : (
          /* Apple Music Embedded Player */
          <iframe
            title="Apple Music Player"
            allow="autoplay *; encrypted-media *;"
            height="100%"
            width="100%"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            src="https://embed.music.apple.com/sg/playlist/favourite-songs/pl.u-RrUxXgzPN"
            className="w-full h-full min-h-[180px] rounded border-0"
          />
        )}
      </div>

      {/* --- TRANSPORT CONTROLS --- */}
      <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevTrack}
            disabled={mode === 'apple-music'}
            className="p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 text-white font-mono text-xs transition-colors"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            disabled={mode === 'apple-music'}
            className="py-1 px-3 rounded bg-[#00BFFF]/20 border border-[#00BFFF]/50 hover:bg-[#00BFFF]/30 disabled:opacity-30 text-[#00BFFF] font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-1"
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            onClick={handleNextTrack}
            disabled={mode === 'apple-music'}
            className="p-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 text-white font-mono text-xs transition-colors"
          >
            ⏭
          </button>
        </div>

        <a
          href="https://embed.music.apple.com/sg/playlist/favourite-songs/pl.u-RrUxXgzPN"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] font-mono text-[#FF1493] font-bold hover:underline flex items-center gap-1"
        >
          <span>Apple Music</span> ↗
        </a>
      </div>

    </div>
  );
}
💡 Would you like me to convert another card(such as the Stark - Tech Arc Reactor or RSA Key Portal) next, or help you assemble all 6 cards into a responsive 3x2 CSS Grid container for wongkelvin.com ? keep_pinSave to notekeep_pincopythumb_upthumb_down Saturday, September 19 Build the Arc Reactor in React or any other suggestion ?
  Layout all 6 cards in a responive 3 x 2 CSS Grid Container
Explain what is  'height: auto' animation ? and How do I fix it Thoughts expand_moreHere is the complete solution for building the Stark - Tech Arc Reactor, laying out all 6 cards in a 3x2 CSS Grid, and solving the classic height: auto CSS animation problem.1.Stark - Tech Arc Reactor Component(ArcReactorCard.tsx)The Stark - Tech Arc Reactor serves as the central energy core of your spatial cryptographic landing page[5].This React component encapsulates concentric glowing rings, a real - time power output simulation, and an interactive Core Overdrive mode toggle.import React, { useState } from 'react';

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
2. Laying Out All 6 Cards in a Responsive 3 x 2 CSS Grid(DashboardGrid.tsx)CSS Grid excels at orchestrating 2 - dimensional layouts across rows and columns simultaneously[1, 4, 7].To render the 6 spatial cryptographic cards from your index.html - sample.docx file[5]:Mobile View(1 column): Cards stack vertically for easy scrolling(grid - cols - 1).Tablet View(2 columns): Arranges into 3 rows of 2 cards(md: grid - cols - 2).Desktop View(3 columns x 2 rows): Achieves the clean 3x2 grid layout(lg: grid - cols - 3).import React from 'react';
import { JukeboxCard } from './JukeboxCard';
import { ArcReactorCard } from './ArcReactorCard';

// Temporary Placeholder Cards for the remaining 4 cards
const GlassCardPlaceholder = ({ title }: { title: string }) => (
  <div className="p-5 rounded-[14px] bg-[#14161a]/72 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between min-h-[300px] hover:border-[#00BFFF]/40 transition-all">
    <div className="text-[10px] font-mono text-[#00BFFF] font-bold uppercase tracking-widest border-b border-white/5 pb-2">
      {title}
    </div>
    <div className="flex-1 flex items-center justify-center text-slate-500 font-mono text-xs">
      [ Card Component Interface ]
    </div>
  </div>
);

export function DashboardGrid() {
  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white p-4 sm:p-8">

      {/* Header */}
      <header className="mb-8 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-white to-[#FF1493]">
          SPATIAL CRYPTOGRAPHIC GATEWAY
        </h1>
        <p className="text-xs font-mono text-slate-400">wongkelvin.com // AI Systems Architecture Node</p>
      </header>

      {/* --- RESPONSIVE 3x2 CSS GRID CONTAINER --- */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {/* Card 1 */}
        <GlassCardPlaceholder title="Card 1: Global Time Nodes" />

        {/* Card 2 */}
        <GlassCardPlaceholder title="Card 2: Cryptographic TSA Astrolabe" />

        {/* Card 3 */}
        <GlassCardPlaceholder title="Card 3: RSA Key Portal" />

        {/* Card 4 (Rebuilt Jukebox) */}
        <JukeboxCard />

        {/* Card 5 */}
        <GlassCardPlaceholder title="Card 5: Mechanical Clock Movement" />

        {/* Card 6 (Rebuilt Arc Reactor) */}
        <ArcReactorCard />
      </main>

    </div>
  );
}
3. Understanding and Fixing the height: auto CSS Animation ProblemWhat is height: auto Animation ? When creating collapsible UI elements(such as accordions, dropdowns, or expandable card descriptions), you often want to animate from a hidden state(height: 0px) to an expanded state(height: auto).However, traditional CSS transitions do NOT work with height: auto.When you set transition: height 0.3s ease, CSS requires exact numeric start and end values(e.g., 0px to 200px) to calculate intermediate frames.Because auto depends on content layout after rendering, the browser cannot interpolate the numbers mid - transition, resulting in an abrupt snap rather than a smooth animation.How to Fix It(2 Modern Techniques)Solution A: The Modern Native CSS Standard(interpolate - size)Modern browsers have introduced the interpolate - size CSS property, allowing animations to transition smoothly between keyword values like auto and explicit pixel sizes without JavaScript measurements[6]./* Enables smooth keyword transitions globally */
:root {
  interpolate - size: allow - keywords;
}

/* Accordion or Collapsible Container */
.expandable - panel {
  height: 0;
  overflow: hidden;
  transition: height 0.4s ease -in -out;
}

.expandable - panel.is - expanded {
  height: auto; /* Transitions smoothly thanks to interpolate-size! */
}
Solution B: The CSS Grid Fractional Trick(100 % Cross - Browser Support)If you need compatibility across all legacy browsers, you can animate a CSS Grid parent using grid-template - rows: 0fr transitioning to grid - template - rows: 1fr[1, 7]: function ExpandableGlassSection({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-template-rows-[1fr] opacity-100' : 'grid-template-rows-[0fr] opacity-0'
        }`}
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}
