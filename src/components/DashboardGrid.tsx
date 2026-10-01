import React from 'react';
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
