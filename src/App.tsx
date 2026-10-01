import { TimeNodesCard } from './components/TimeNodesCard';
import { GlassCard } from './components/GlassCard';
import { RsaKeyCard } from './components/RsaKeyCard';
import { JukeboxCard } from './components/JukeboxCard';
import { ArcReactorCard } from './components/ArcReactorCard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white p-4 sm:p-8 font-sans">
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {/* Card 1: Global Time Nodes */}
        <TimeNodesCard />

        {/* Card 2: TSA Astrolabe */}
        <GlassCard title="TSA Astrolabe">...</GlassCard>

        {/* Card 3: RSA Key Portal */}
        <RsaKeyCard />

        {/* Card 4: Jukebox Reverb */}
        <JukeboxCard />

        {/* Card 5: Mechanical Movement */}
        <GlassCard title="Mechanical Movement">...</GlassCard>

        {/* Card 6: Arc Reactor Core */}
        <ArcReactorCard />
      </main>
    </div>
  );
}
