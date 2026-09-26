import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Maximize2,
  Subtitles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  MAP_LOCATIONS,
  PHOTO_STORY_SLIDES,
  STORIES,
  BRAND_ASSETS,
} from '../data/stories';
import { Story, MapLocationNode } from '../types/story';
import { ResilientImage } from './ResilientImage';
import { soundEngine } from '../utils/soundEngine';

interface MultimediaFormatsSectionProps {
  onOpenStory: (story: Story) => void;
  activeTabOverride?: 'audio' | 'video' | 'photo' | 'map' | null;
}

export const MultimediaFormatsSection: React.FC<MultimediaFormatsSectionProps> = ({
  onOpenStory,
  activeTabOverride,
}) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'photo' | 'map'>('map');

  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);

  // --- Audio Player State ---
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(24);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [audioVolume, setAudioVolume] = useState(0.75);

  useEffect(() => {
    if (!audioPlaying) return;
    const timer = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 180) {
          setAudioPlaying(false);
          soundEngine.stopAmbientDrone();
          return 0;
        }
        return prev + 1 * audioSpeed;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [audioPlaying, audioSpeed]);

  const toggleAudioPlay = () => {
    if (audioPlaying) {
      soundEngine.stopAmbientDrone();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setAudioPlaying(false);
    } else {
      soundEngine.startAmbientDrone(110);
      setAudioPlaying(true);
    }
  };

  // --- Video Experience State ---
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(12);
  const [showCaptions, setShowCaptions] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoPlaying) return;
    const interval = setInterval(() => {
      setVideoTime((t) => (t >= 90 ? 0 : t + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [videoPlaying]);

  const videoCaptions = [
    {
      start: 0,
      end: 25,
      text: '[ATMOS DRONE] Over the basalt plateau of Sol-9, stellar dust drifts like golden snow...',
    },
    {
      start: 26,
      end: 55,
      text: '[ARCHIVIST VOICE] "Seventeen cycles of silence, and the crystalline core still hums at 42 Hertz."',
    },
    {
      start: 56,
      end: 90,
      text: '[CORE RESONANCE] Ten thousand archived memories awaken across the obsidian plaza.',
    },
  ];

  const currentCaption =
    videoCaptions.find((c) => videoTime >= c.start && videoTime <= c.end)?.text ||
    videoCaptions[0].text;

  // --- Photo Story State ---
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentSlide = PHOTO_STORY_SLIDES[photoIndex];

  // --- Interactive Map State ---
  const [selectedNode, setSelectedNode] = useState<MapLocationNode>(
    MAP_LOCATIONS[4]
  );

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const tabs = [
    { id: 'map' as const, num: '01', label: 'Cartographic Map' },
    { id: 'audio' as const, num: '02', label: 'Spatial Audio' },
    { id: 'video' as const, num: '03', label: 'Volumetric Cinema' },
    { id: 'photo' as const, num: '04', label: 'Archival Photo Folio' },
  ];

  return (
    <section
      id="formats"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 bg-[#050507] border-t border-white/[0.08]"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08] mb-12">
        <div className="lg:col-span-6">
          <div className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174] mb-3">
            03 / MULTI-MODAL STORYTELLING FORMATS
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#f4f2ed] font-normal tracking-tight leading-none">
            Beyond the <span className="italic text-[#ffc174]">printed</span> page.
          </h2>
        </div>

        {/* Clean Architectural Format Tabs */}
        <div
          className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-6"
          role="tablist"
          aria-label="Storytelling Formats"
        >
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(t.id)}
                className={`pb-2 text-xs font-mono-tabular uppercase tracking-[0.16em] transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-[#ffc174] text-[#ffc174] font-semibold'
                    : 'border-transparent text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
              >
                <span className="opacity-60 mr-1.5">{t.num} /</span>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: INTERACTIVE MAP STORY */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 relative h-[400px] sm:h-[460px] bg-[#090a0f] border border-white/15 overflow-hidden p-6">
            <div className="absolute top-5 left-6 z-10">
              <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#7bd0ff] block">
                TOPOLOGICAL CARTOGRAPHY · SECTOR SOL-9
              </span>
              <span className="text-xs text-[#b8b0a4]">
                Select any coordinate node to inspect its narrative context
              </span>
            </div>

            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <ellipse
                cx="50"
                cy="50"
                rx="42"
                ry="32"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.25"
                strokeDasharray="1,1"
              />
              <ellipse
                cx="55"
                cy="45"
                rx="28"
                ry="20"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.25"
              />

              {MAP_LOCATIONS.map((loc) =>
                loc.connectedTo.map((targetId) => {
                  const target = MAP_LOCATIONS.find((m) => m.id === targetId);
                  if (!target) return null;
                  const isHighlighted =
                    selectedNode.id === loc.id || selectedNode.id === target.id;
                  return (
                    <line
                      key={`${loc.id}-${target.id}`}
                      x1={loc.coordinates.x}
                      y1={loc.coordinates.y}
                      x2={target.coordinates.x}
                      y2={target.coordinates.y}
                      stroke={isHighlighted ? '#ffc174' : '#7bd0ff'}
                      strokeOpacity={isHighlighted ? 0.85 : 0.22}
                      strokeWidth={isHighlighted ? 0.6 : 0.3}
                      strokeDasharray={isHighlighted ? 'none' : '1.5,1.5'}
                    />
                  );
                })
              )}
            </svg>

            {MAP_LOCATIONS.map((loc) => {
              const isSelected = selectedNode.id === loc.id;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playChime('discover');
                    setSelectedNode(loc);
                  }}
                  style={{
                    left: `${loc.coordinates.x}%`,
                    top: `${loc.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      isSelected
                        ? 'bg-[#ffc174] ring-4 ring-[#ffc174]/30 scale-125'
                        : 'bg-[#050507] border-2 border-[#7bd0ff] hover:scale-110'
                    }`}
                  />
                  <span
                    className={`mt-1.5 block px-2 py-0.5 text-[10px] font-mono-tabular uppercase tracking-widest whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#ffc174] text-[#1a0f00] font-bold'
                        : 'bg-[#050507]/90 text-[#f4f2ed] border border-white/10 group-hover:text-[#ffc174]'
                    }`}
                  >
                    {loc.id}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] border-b border-white/[0.08] pb-3">
              <span>{selectedNode.region}</span>
              <span className="text-[#7bd0ff]">ELEVATION {selectedNode.elevation}</span>
            </div>

            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f4f2ed]">
              {selectedNode.name}
            </h3>

            <p className="text-base text-[#b8b0a4] font-light leading-relaxed">
              {selectedNode.description}
            </p>

            <blockquote className="pl-4 border-l border-[#ffc174] font-serif-editorial italic text-base text-[#f4f2ed]/90">
              “{selectedNode.loreFragment}”
            </blockquote>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  const found =
                    STORIES.find((s) => s.title === selectedNode.linkedStoryTitle) ||
                    STORIES[0];
                  onOpenStory(found);
                }}
                className="bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] px-6 py-3.5 rounded-xs text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Story: {selectedNode.linkedStoryTitle}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPATIAL AUDIO STORY EXPERIENCE */}
      {activeTab === 'audio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] border border-white/15 overflow-hidden">
              <ResilientImage
                src={BRAND_ASSETS.marsLettersCard}
                alt="Letters From Mars Spatial Audio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] mb-1">
                  BINAURAL FIELD RECORDING · 432HZ
                </div>
                <h3 className="font-serif-editorial text-3xl text-[#f4f2ed]">
                  Letters From Mars — Dispatch 01
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-widest text-[#7bd0ff] mb-3">
                <span>NARRATED BY DR. ISABEL SOLIS · CHRYSE PLANITIA</span>
                <span>{formatTime(audioProgress)} / 3:00</span>
              </div>
              <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#f4f2ed] leading-relaxed">
                “On Earth, the sky is blue at noon and red at sunset. Here on Mars, all day the sky is butterscotch rust, and then as the sun dips below the crater rim, a halo of pure sapphire blooms...”
              </p>
            </div>

            {/* Interactive Optical Waveform */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.max(
                  0,
                  Math.min(1, (e.clientX - rect.left) / rect.width)
                );
                setAudioProgress(Math.round(pct * 180));
              }}
              className="h-24 border-y border-white/10 py-4 flex items-center justify-between gap-1 cursor-pointer"
              title="Click to seek across acoustic waveform"
            >
              {Array.from({ length: 56 }).map((_, idx) => {
                const pct = (idx / 56) * 180;
                const isPlayed = pct <= audioProgress;
                const baseHeight = 18 + ((idx * 19) % 70);
                return (
                  <div
                    key={idx}
                    className={`w-1 transition-all duration-200 ${
                      isPlayed ? 'bg-[#ffc174]' : 'bg-white/15'
                    }`}
                    style={{
                      height: `${
                        audioPlaying
                          ? Math.min(100, baseHeight + ((idx + audioProgress) % 24))
                          : baseHeight
                      }%`,
                    }}
                  />
                );
              })}
            </div>

            {/* Transport Controls */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAudioProgress((p) => Math.max(0, p - 10))}
                  className="p-3 border border-white/15 hover:border-[#ffc174] text-[#f4f2ed] transition-colors cursor-pointer"
                  title="Rewind 10 seconds"
                  aria-label="Rewind 10 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleAudioPlay}
                  className="px-7 py-3.5 bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] font-bold text-xs uppercase tracking-[0.16em] flex items-center gap-2 cursor-pointer"
                >
                  {audioPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Stream</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Spatial Audio</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setAudioProgress((p) => Math.min(180, p + 10))}
                  className="p-3 border border-white/15 hover:border-[#ffc174] text-[#f4f2ed] transition-colors cursor-pointer"
                  title="Forward 10 seconds"
                  aria-label="Forward 10 seconds"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 border border-white/15 p-1">
                  {[0.75, 1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => {
                        setAudioSpeed(spd);
                        soundEngine.setPlaybackSpeed(spd);
                      }}
                      className={`px-2 py-1 text-[11px] font-mono-tabular cursor-pointer ${
                        audioSpeed === spd
                          ? 'bg-[#ffc174] text-[#1a0f00] font-bold'
                          : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#ffc174]" />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={audioVolume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setAudioVolume(v);
                      soundEngine.setVolume(v);
                    }}
                    className="w-24 accent-[#ffc174] cursor-pointer"
                    aria-label="Audio volume"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VIDEO STORY EXPERIENCE */}
      {activeTab === 'video' && (
        <div
          ref={videoContainerRef}
          className="border border-white/15 bg-[#050507] overflow-hidden"
        >
          <div className="relative h-[420px] sm:h-[520px] overflow-hidden flex items-center justify-center">
            <ResilientImage
              src={BRAND_ASSETS.spotlightHero}
              alt="The Last Light Volumetric Cinema"
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                videoPlaying ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/30 to-transparent" />

            {!videoPlaying && (
              <button
                type="button"
                onClick={() => {
                  setVideoPlaying(true);
                  soundEngine.startAmbientDrone(98);
                }}
                className="relative z-10 w-20 h-20 rounded-full bg-[#ffc174] text-[#1a0f00] flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-transform hover:scale-105 cursor-pointer"
                aria-label="Play video story"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            )}

            {showCaptions && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-2xl w-[90%] bg-[#050507]/90 backdrop-blur px-6 py-3 border border-white/15 text-center">
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#f4f2ed]">
                  {currentCaption}
                </p>
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 bg-[#050507]/95 backdrop-blur px-6 py-4 flex flex-col gap-2.5 border-t border-white/10">
              <input
                type="range"
                min={0}
                max={90}
                value={videoTime}
                onChange={(e) => setVideoTime(Number(e.target.value))}
                className="w-full h-1 accent-[#ffc174] cursor-pointer"
                aria-label="Video timeline"
              />
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#b8b0a4]">
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => {
                      if (videoPlaying) {
                        setVideoPlaying(false);
                        soundEngine.stopAmbientDrone();
                      } else {
                        setVideoPlaying(true);
                        soundEngine.startAmbientDrone(98);
                      }
                    }}
                    className="text-[#ffc174] hover:text-[#f4f2ed] flex items-center gap-1.5 font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    {videoPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                  <span>{formatTime(videoTime)} / 1:30</span>
                  <span className="hidden sm:inline text-[#f4f2ed]">
                    THE LAST LIGHT — VOLUMETRIC PROLOGUE
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      showCaptions ? 'text-[#ffc174]' : 'text-[#b8b0a4]'
                    }`}
                    title="Toggle Captions"
                  >
                    <Subtitles className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (videoContainerRef.current?.requestFullscreen) {
                        videoContainerRef.current.requestFullscreen().catch(() => {});
                      }
                    }}
                    className="p-1.5 text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PHOTO STORY EXPERIENCE */}
      {activeTab === 'photo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] border border-white/15 overflow-hidden bg-[#090a0f]">
            <ResilientImage
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute bottom-4 right-4 bg-[#050507]/90 backdrop-blur px-3 py-1 border border-white/10 text-[11px] font-mono-tabular text-[#b8b0a4]">
              {currentSlide.cameraSpecs}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-widest text-[#ffc174] pb-3 border-b border-white/10 mb-4">
                <span>{currentSlide.location}</span>
                <span>{currentSlide.date}</span>
              </div>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f4f2ed] mb-4">
                {currentSlide.title}
              </h3>
              <p className="font-serif-editorial italic text-lg text-[#f4f2ed]/90 mb-5">
                “{currentSlide.caption}”
              </p>
              <p className="text-sm text-[#b8b0a4] font-light leading-relaxed">
                {currentSlide.storyContext}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() =>
                  setPhotoIndex(
                    (photoIndex - 1 + PHOTO_STORY_SLIDES.length) %
                      PHOTO_STORY_SLIDES.length
                  )
                }
                className="px-4 py-2.5 border border-white/15 hover:border-[#ffc174] text-xs font-mono-tabular uppercase tracking-wider text-[#f4f2ed] flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Plate</span>
              </button>
              <span className="text-xs font-mono-tabular text-[#b8b0a4]">
                PLATE 0{photoIndex + 1} / 0{PHOTO_STORY_SLIDES.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPhotoIndex((photoIndex + 1) % PHOTO_STORY_SLIDES.length)
                }
                className="px-4 py-2.5 bg-[#ffc174] hover:bg-[#ffddb8] text-xs font-mono-tabular font-bold uppercase tracking-wider text-[#1a0f00] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Plate</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
