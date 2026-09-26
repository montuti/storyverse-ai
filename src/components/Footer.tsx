import React, { useState } from 'react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateFormat: (tab: 'audio' | 'video' | 'photo' | 'map') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPolicy: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateFormat,
  onNavigateSection,
  onOpenPolicy,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#050507] pt-20 pb-24 lg:pb-16 border-t border-white/[0.1]">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Colophon Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174]">
              COLOPHON · EDITION 2026
            </div>
            <div className="font-serif-editorial text-4xl text-[#f4f2ed] tracking-tight">
              Storyverse
            </div>
            <p className="text-sm text-[#b8b0a4] max-w-md font-light leading-relaxed">
              “Don&apos;t just read the story. Enter it.” An interactive literary, spatial, and pedagogical publication uniting narrative craft with artificial intelligence.
            </p>
          </div>

          {/* Interactive Mediums Index */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
              Interactive Mediums
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tabular uppercase tracking-wider text-[#b8b0a4]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateFormat('photo')}
                  className="hover:text-[#f4f2ed] transition-colors cursor-pointer"
                >
                  01 / Archival Photo Folios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateFormat('audio')}
                  className="hover:text-[#f4f2ed] transition-colors cursor-pointer"
                >
                  02 / Binaural Audio Dramas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('3d-and-ai')}
                  className="hover:text-[#f4f2ed] transition-colors cursor-pointer"
                >
                  03 / Volumetric 3D Artifacts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('3d-and-ai')}
                  className="hover:text-[#f4f2ed] transition-colors cursor-pointer"
                >
                  04 / AI Story Synthesis Lab
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateFormat('map')}
                  className="hover:text-[#f4f2ed] transition-colors cursor-pointer"
                >
                  05 / Topological Cartography
                </button>
              </li>
            </ul>
          </div>

          {/* The Observatory Dispatch Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
              The Observatory Dispatch
            </h4>
            <p className="text-sm text-[#b8b0a4] font-light leading-relaxed">
              Receive curatorial dispatches when new interactive worlds, telemetry essays, and branching folios enter the archive.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 border border-[#ffc174]/40 p-3.5 text-xs text-[#ffc174]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Registered for The Observatory Dispatch.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 border-b border-white/25 focus-within:border-[#ffc174] pb-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your dispatch address..."
                  className="bg-transparent text-[#f4f2ed] placeholder:text-[#b8b0a4]/50 text-xs sm:text-sm focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="text-xs font-mono-tabular font-bold uppercase tracking-[0.16em] text-[#ffc174] hover:text-[#f4f2ed] flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Protocol Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tabular text-[#b8b0a4]/80">
          <div>
            © 2026 STORYVERSE PUBLICATION · ALL NARRATIVE RIGHTS RESERVED
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {[
              'Cosmic Codex',
              'Editorial Protocols',
              'Privacy Canvas',
              'Synthetics Policy',
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onOpenPolicy(item)}
                className="hover:text-[#ffc174] transition-colors cursor-pointer uppercase tracking-wider"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
