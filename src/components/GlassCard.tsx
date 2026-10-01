import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`relative overflow-hidden p-5 rounded-[14px] bg-[#14161a]/72 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-[#00BFFF]/40 ${className}`}>
      {children}
    </div>
  );
}