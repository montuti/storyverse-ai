import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Film,
  Volume2,
  Sparkles,
  Layers,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { BRAND_ASSETS } from '../data/stories';
import { ResilientImage } from './ResilientImage';

export const AuthGateScreen: React.FC = () => {
  const { signIn, signUp, signInDemoExplorer, authError, clearAuthError } =
    useAuth();
  const { theme, toggleTheme } = useTheme();

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchMode = (nextMode: 'signup' | 'signin') => {
    clearAuthError();
    setMode(nextMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
    } catch {
      // error is captured in authError
    } finally {
      setIsSubmitting(false);
    }
  };

  const conceptPillars = [
    {
      icon: Film,
      code: '01 / CINEMA',
      title: 'Synchronized Video & Scene Transitions',
      desc: 'Documentary-grade visual timelines with automated Ken Burns, crossfade, and illustrated scene progression.',
    },
    {
      icon: Volume2,
      code: '02 / VOICE',
      title: 'AI Voice Story Guide & Live Text',
      desc: 'Real-time voice narration synchronized sentence-by-sentence with interactive playback and speed controls.',
    },
    {
      icon: Layers,
      code: '03 / INTERACTION',
      title: 'Branching Worlds & Story DNA',
      desc: 'Every story carries a 7-axis narrative fingerprint, interactive choices, and multi-modal Read, Listen, and Cinema modes.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050507] text-[#f4f2ed] flex flex-col justify-between relative overflow-hidden editorial-grid-bg">
      {/* Ambient Volumetric Light Aura */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient cx="75%" cy="30%" id="auth-gold-aura" r="45%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
              <stop offset="55%" stopColor="#571bc1" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>
            <radialGradient cx="20%" cy="70%" id="auth-cyan-aura" r="40%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#050507" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#auth-gold-aura)" width="100%" height="100%" />
          <rect fill="url(#auth-cyan-aura)" width="100%" height="100%" />
        </svg>
      </div>

      {/* Top Pre-Auth Header: STORYVERSE Logo, Quick Auth Triggers & Theme Toggle */}
      <header className="relative z-20 w-full border-b border-white/10 bg-[#050507]/85 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#ffc174]" />
            <span className="font-serif-editorial text-2xl sm:text-3xl tracking-tight text-[#f4f2ed] font-medium">
              STORYVERSE
            </span>
            <span className="hidden md:inline-block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4] ml-3 pl-3 border-l border-white/15">
              MULTIMEDIA STORYTELLING SANCTUARY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className={`px-4 py-2 text-xs font-mono-tabular uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                mode === 'signin'
                  ? 'border-[#ffc174] text-[#ffc174] bg-[#ffc174]/10'
                  : 'border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`px-4 py-2 text-xs font-mono-tabular font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#ffc174] text-[#1a0f00]'
                  : 'border border-white/15 text-[#f4f2ed] hover:border-[#ffc174]'
              }`}
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 border border-white/15 text-[#b8b0a4] hover:text-[#ffc174] transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffc174]" />
              ) : (
                <Moon className="w-4 h-4 text-[#ffc174]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Sanctuary Gate: Left = Hero Visual & Concept Preview (NO actual story catalog leaked), Right = Auth Form */}
      <main className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto px-5 md:px-10 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left 7 Columns: Cinematic Tagline, Hero Visual & Concept Architecture Preview */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="inline-flex items-center gap-2.5 text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174]">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTHENTICATED MEMBERS ARCHIVE · SIGN IN TO ENTER</span>
          </div>

          <h1 className="font-serif-editorial text-5xl sm:text-6xl xl:text-7xl text-[#f4f2ed] font-normal tracking-[-0.025em] leading-[0.98]">
            Don&apos;t just read the story.{' '}
            <span className="italic text-[#ffc174]">Enter it.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#b8b0a4] max-w-2xl font-light leading-relaxed">
            Storyverse unites cinematic documentary video, AI voice narration, synchronized live text, illustrated visual worlds, and interactive Story DNA into a single living medium.
          </p>

          {/* Abstract Concept Hero Visual (Does NOT expose actual story library or trending cards) */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden border border-white/15 bg-[#090a0f]">
            <ResilientImage
              src={BRAND_ASSETS.spotlightHero}
              alt="Storyverse Cinematic Atmosphere"
              className="w-full h-full object-cover opacity-65 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/50 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#7bd0ff]">
                <span>SYNCHRONIZED ENGINE // VIDEO + VOICE + TEXT + SCENE</span>
                <span className="text-[#ffc174]">4 PLAYBACK MODES</span>
              </div>
              <div className="max-w-lg">
                <div className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] mb-1">
                  PLATFORM ARCHITECTURE PREVIEW
                </div>
                <div className="font-serif-editorial italic text-2xl sm:text-3xl text-[#f4f2ed]">
                  “A new category between cinema, interactive documentary, and AI-guided literature.”
                </div>
              </div>
            </div>
          </div>

          {/* 3 Concept Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            {conceptPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.code} className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174]">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{pillar.code}</span>
                  </div>
                  <h2 className="font-serif-editorial text-lg text-[#f4f2ed]">
                    {pillar.title}
                  </h2>
                  <p className="text-xs text-[#b8b0a4] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right 5 Columns: Authentication Portal Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="bg-[#090a0f] border border-white/15 p-7 sm:p-10 shadow-[0_32px_90px_rgba(0,0,0,0.85)] space-y-6">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`pb-2 text-xs font-mono-tabular uppercase tracking-[0.18em] border-b-2 transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'border-[#ffc174] text-[#ffc174] font-bold'
                    : 'border-transparent text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
              >
                01 / Create Account
              </button>
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`pb-2 text-xs font-mono-tabular uppercase tracking-[0.18em] border-b-2 transition-colors cursor-pointer ${
                  mode === 'signin'
                    ? 'border-[#ffc174] text-[#ffc174] font-bold'
                    : 'border-transparent text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
              >
                02 / Sign In
              </button>
            </div>

            <div>
              <h2 className="font-serif-editorial text-3xl text-[#f4f2ed]">
                {mode === 'signup'
                  ? 'Initialize Your Explorer Pass'
                  : 'Resume Your Storyverse Session'}
              </h2>
              <p className="text-xs text-[#b8b0a4] mt-1">
                {mode === 'signup'
                  ? 'Create an account to unlock all 16+ interactive worlds, Trending Now, Cinematic Video Player, and the AI Story Guide.'
                  : 'Sign in with your email to access your saved library, watch timeline, and story worlds.'}
              </p>
            </div>

            {authError && (
              <div
                role="alert"
                className="p-3.5 bg-[#ffb4ab]/10 border border-[#ffb4ab] text-xs text-[#ffb4ab] flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#b8b0a4] mb-1.5">
                    Explorer Name / Callsign
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Vance"
                    className="w-full bg-[#050507] border border-white/15 focus:border-[#ffc174] px-4 py-3 text-sm text-[#f4f2ed] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#b8b0a4] mb-1.5">
                  Email Coordinate
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@storyverse.io"
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#ffc174] px-4 py-3 text-sm text-[#f4f2ed] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#b8b0a4] mb-1.5">
                  Passkey (4+ characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#ffc174] px-4 py-3 text-sm text-[#f4f2ed] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] py-4 px-6 text-xs font-mono-tabular font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {mode === 'signup'
                    ? 'Create Account & Enter Storyverse'
                    : 'Sign In & Enter Storyverse'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>

            {/* Instant One-Click Prototype Pass */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={signInDemoExplorer}
                className="w-full bg-[#11131a] hover:bg-white/[0.08] border border-[#7bd0ff]/40 text-[#7bd0ff] py-3 px-4 text-xs font-mono-tabular uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant One-Click Demo Pass (Aria Vance)</span>
              </button>
              <p className="text-[11px] text-[#b8b0a4] text-center mt-2.5">
                Prototype uses localStorage session persistence · Ready for Firebase / Supabase Auth adapter
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Minimal Pre-Auth Footer */}
      <footer className="relative z-10 border-t border-white/10 py-5 px-5 md:px-10 lg:px-16 text-xs font-mono-tabular text-[#b8b0a4] flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1600px] w-full mx-auto">
        <span>STORYVERSE MULTIMEDIA PLATFORM · AUTHENTICATION REQUIRED</span>
        <span>VIDEO · VOICE · LIVE TEXT · SCENE TIMELINE · AI GUIDE</span>
      </footer>
    </div>
  );
};
