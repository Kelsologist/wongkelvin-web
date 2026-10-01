import React, { useState } from 'react';

export function RsaKeyCard() {
  const [copied, setCopied] = useState(false);

  const mockKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuZ0W5+X2sK9p
a9Bw4kX4QxW8M3mK7nL2p5rT8vY1a3c5e7g9i1k3m5o7q9s1u3w5y7z9
-----END PUBLIC KEY-----`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mockKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden p-5 rounded-[14px] bg-[#14161a]/72 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between h-full hover:border-[#00BFFF]/40 transition-all">
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
        <span className="text-[10px] font-mono text-[#00BFFF] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] animate-pulse" />
          RSA KEY PORTAL
        </span>
        <span className="text-[9px] font-mono text-[#39FF14] font-bold">2048-BIT HANDSHAKE</span>
      </div>

      <div className="my-auto bg-black/60 rounded-lg p-3 border border-white/5 font-mono">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] text-slate-400">PUBLIC_KEY_PEM</span>
          <button
            onClick={handleCopy}
            className="text-[9px] px-2 py-0.5 rounded bg-[#00BFFF]/20 border border-[#00BFFF]/40 text-[#00BFFF] hover:bg-[#00BFFF]/30 font-bold"
          >
            {copied ? 'COPIED!' : 'COPY KEY'}
          </button>
        </div>
        <pre className="text-[8px] text-slate-300 leading-tight overflow-x-auto whitespace-pre-wrap break-all bg-black/40 p-2 rounded border border-white/5">
          {mockKey}
        </pre>
      </div>

      <div className="border-t border-white/5 pt-2 mt-2 flex justify-between items-center font-mono text-[9px] text-slate-400">
        <span>ALGORITHM: RSA-OAEP-4096</span>
        <span className="text-[#39FF14]">SECURE LINK</span>
      </div>
    </div>
  );
}