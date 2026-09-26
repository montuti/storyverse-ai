import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Shuffle } from 'lucide-react';
import { BRAND_ASSETS } from '../data/stories';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreStories: () => void;
  onStartRandomStory: () => void;
  onEnterFeatured: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreStories,
  onStartRandomStory,
  onEnterFeatured,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 28;
    const y = (e.clientY / innerHeight - 0.5) * 28;
    setMouseOffset({ x, y });
  };

  const manifestoWords = [
    { text: 'WHAT', accent: false },
    { text: 'IF', accent: false },
    { text: 'STORIES', accent: true },
    { text: 'WERE', accent: false },
    { text: 'EXPERIENCES?', accent: true },
  ];

  return (
    <div id="hero" className="relative w-full overflow-hidden bg-[#050507] editorial-grid-bg">
      {/* Layered Atmospheric Depth & Volumetric Light Field */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0)`,
        }}
        aria-hidden="true"
      >
        <svg className="w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient cx="72%" cy="32%" id="hero-amber-aura" r="48%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#571bc1" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>
            <radialGradient cx="18%" cy="60%" id="hero-cyan-aura" r="42%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#hero-amber-aura)" height="100%" width="100%" />
          <rect fill="url(#hero-cyan-aura)" height="100%" width="100%" />
          {/* Subtle Celestial Coordinates */}
          <line x1="8%" y1="0" x2="8%" y2="100%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="92%" y1="0" x2="92%" y2="100%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <circle cx="16%" cy="22%" fill="#ffc174" opacity="0.7" r="1.5" />
          <circle cx="48%" cy="16%" fill="#ffffff" opacity="0.4" r="1" />
          <circle cx="78%" cy="28%" fill="#7bd0ff" opacity="0.75" r="1.8" />
          <circle cx="84%" cy="68%" fill="#d0bcff" opacity="0.6" r="1.5" />
          <circle cx="24%" cy="74%" fill="#ffc174" opacity="0.5" r="1.2" />
        </svg>
      </div>

      {/* Main Widescreen Editorial Hero Stage */}
      <section
        onMouseMove={handleMouseMove}
        className="relative max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 pt-12 pb-20 lg:pt-24 lg:pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left 7 Columns: Monumental Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left"
            style={{
              transform: `translate3d(0, ${Math.min(scrollY * -0.1, 0)}px, 0)`,
            }}
          >
            {/* Unboxed Issue / Edition Kicker */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] mb-6">
              <span>ISSUE NO. 09</span>
              <span className="text-white/25">·</span>
              <span className="text-[#b8b0a4]">INTERACTIVE LITERARY &amp; SPATIAL ARCHIVE</span>
            </div>

            {/* Primary Monumental Headline */}
            <h1
              className="font-serif-editorial text-5xl sm:text-7xl xl:text-[84px] font-normal text-[#f4f2ed] tracking-[-0.025em] leading-[0.98] mb-8"
              style={{ textWrap: 'balance' }}
            >
              Stories that{' '}
              <span className="italic font-normal text-[#ffc174]">move</span> you.{' '}
              <span className="block text-3xl sm:text-5xl xl:text-[56px] text-[#b8b0a4] mt-3 leading-[1.08]">
                Don&apos;t just read the story.{' '}
                <span className="text-[#f4f2ed] italic">Enter it.</span>
              </span>
            </h1>

            {/* Editorial Deck */}
            <p className="text-base sm:text-lg lg:text-xl text-[#b8b0a4] max-w-xl font-light leading-relaxed mb-10">
              Stories told through words, volumetric visuals, live telemetry data, binaural sound, branching consequence, and contextual artificial intelligence.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onEnterFeatured}
                className="bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] text-xs font-bold tracking-[0.18em] uppercase px-8 py-4 rounded-xs shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <span>Enter Storyverse</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreStories}
                className="bg-transparent hover:bg-white/[0.05] text-[#f4f2ed] border border-white/20 hover:border-[#ffc174] text-xs font-semibold tracking-[0.18em] uppercase px-7 py-4 rounded-xs transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <span>Discover Stories</span>
                <ArrowDown className="w-4 h-4 text-[#ffc174]" />
              </button>

              <button
                type="button"
                onClick={onStartRandomStory}
                className="text-xs font-mono-tabular uppercase tracking-[0.15em] text-[#b8b0a4] hover:text-[#ffc174] px-4 py-3 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#ffc174]" />
                <span>Random Transmission</span>
              </button>
            </div>
          </motion.div>

          {/* Right 5 Columns: Layered Cinematic Diptych & Interactive Story Fragments */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.45}px, ${mouseOffset.y * 0.45}px, 0)`,
            }}
          >
            {/* Primary Framed Artwork Plate */}
            <div
              data-cursor="story"
              onClick={onEnterFeatured}
              className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden border border-white/15 group cursor-pointer shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
            >
              <ResilientImage
                src={BRAND_ASSETS.spotlightHero}
                alt="The Last Light — Sol-9 Caldera"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />

              {/* Top Plate Accession Number */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#f4f2ed]/80">
                <span>PLATE 01 · SOL-9 CALDERA</span>
                <span className="text-[#ffc174]">18 MIN</span>
              </div>

              {/* Bottom Plate Caption */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] mb-1">
                  Masterwork Selection
                </div>
                <div className="font-serif-editorial text-3xl text-[#f4f2ed] leading-none mb-2">
                  The Last Light
                </div>
                <p className="text-xs text-[#b8b0a4] font-serif-editorial italic">
                  “In a cosmos slowly surrendering its own historical memory, one traveler discovers a flame holding the thoughts of a dead world.”
                </p>
              </div>
            </div>

            {/* Floating Story Fragment 1 (Left Offset) */}
            <button
              type="button"
              onClick={onEnterFeatured}
              style={{
                transform: `translate3d(${mouseOffset.x * -0.7}px, ${mouseOffset.y * -0.5}px, 0)`,
              }}
              className="hidden sm:block absolute -left-8 top-12 max-w-[220px] bg-[#090a0f]/95 backdrop-blur-xl border-l-2 border-[#ffc174] p-3.5 text-left shadow-2xl hover:border-white transition-colors cursor-pointer"
            >
              <div className="text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] mb-1">
                FRAGMENT 01 · AUDIO &amp; PROSE
              </div>
              <div className="font-serif-editorial italic text-xs text-[#f4f2ed] leading-relaxed">
                “As your glove nears the meniscus, ten thousand voices chant coordinates of a vanished sun...”
              </div>
            </button>

            {/* Floating Story Fragment 2 (Bottom-Right Offset) */}
            <button
              type="button"
              onClick={onExploreStories}
              style={{
                transform: `translate3d(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px, 0)`,
              }}
              className="hidden sm:block absolute -right-4 -bottom-6 max-w-[230px] bg-[#090a0f]/95 backdrop-blur-xl border-l-2 border-[#7bd0ff] p-3.5 text-left shadow-2xl hover:border-white transition-colors cursor-pointer"
            >
              <div className="text-[9px] font-mono-tabular uppercase tracking-[0.18em] text-[#7bd0ff] mb-1">
                FRAGMENT 02 · CONSEQUENCE
              </div>
              <div className="font-serif-editorial italic text-xs text-[#f4f2ed] leading-relaxed">
                “The light is fading. Will you bind its memory lattice or seal the sanctuary?”
              </div>
            </button>
          </motion.div>
        </div>

        {/* Architectural Hairline Telemetry Ledger (Replaces Boxed Stat Cards) */}
        <div className="mt-20 lg:mt-28 pt-8 border-t border-white/[0.09] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4]">
              01 / Interactive Arcs
            </div>
            <div className="font-serif-editorial text-3xl lg:text-4xl text-[#f4f2ed] font-mono-tabular mt-1">
              12 Curated Worlds
            </div>
            <div className="text-xs text-[#ffc174] mt-1">
              Multi-chapter branching folios
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4]">
              02 / Narrative Formats
            </div>
            <div className="font-serif-editorial text-3xl lg:text-4xl text-[#f4f2ed] font-mono-tabular mt-1">
              6 Mediums
            </div>
            <div className="text-xs text-[#7bd0ff] mt-1">
              Prose · Audio · 3D · Data · Map · AI
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4]">
              03 / Consequence Paths
            </div>
            <div className="font-serif-editorial text-3xl lg:text-4xl text-[#f4f2ed] font-mono-tabular mt-1">
              36+ Branches
            </div>
            <div className="text-xs text-[#d0bcff] mt-1">
              Persistent local timeline state
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4]">
              04 / Explore Below
            </div>
            <button
              type="button"
              onClick={onExploreStories}
              className="mt-2 inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] hover:text-[#f4f2ed] transition-colors cursor-pointer group"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: Editorial Manifesto ("WHAT IF STORIES WERE EXPERIENCES?") */}
      <section className="relative max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 border-t border-white/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
          <div className="lg:col-span-3">
            <span className="text-[11px] font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174]">
              00 / THE MANIFESTO
            </span>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-8">
              {manifestoWords.map((w, idx) => (
                <motion.span
                  key={w.text}
                  initial={{ opacity: 0.25, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`font-serif-editorial text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none ${
                    w.accent ? 'italic text-[#ffc174]' : 'text-[#f4f2ed]'
                  }`}
                >
                  {w.text}
                </motion.span>
              ))}
            </div>
            <p className="text-lg sm:text-xl text-[#b8b0a4] max-w-2xl font-light leading-relaxed">
              Storyverse transforms traditional storytelling into interactive digital experiences—where every chapter responds to your curiosity, every dataset breathes with human consequence, and every choice leaves a trace.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
