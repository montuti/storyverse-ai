import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Film,
  BookOpen,
  Headphones,
  Maximize2,
  Minimize2,
  Sparkles,
  Subtitles,
  Palette,
} from 'lucide-react';
import { Story, PlayerMode, StoryScene } from '../types/story';
import { buildScenesForStory } from '../data/sceneEngine';
import { ResilientImage } from './ResilientImage';
import { StoryDNAVisualizer } from './StoryDNAVisualizer';
import { IllustratedSceneCanvas } from './IllustratedSceneCanvas';
import { soundEngine } from '../utils/soundEngine';

interface ImmersiveReaderModalProps {
  story: Story | null;
  allStories: Story[];
  isSaved: boolean;
  savedChoiceId?: string;
  onClose: () => void;
  onToggleBookmark: (title: string) => void;
  onRecordChoice: (storyTitle: string, choiceId: string) => void;
  onCompleteStory: (storyTitle: string) => void;
  onUpdateWatchProgress?: (
    storyTitle: string,
    sceneIndex: number,
    currentTime: number
  ) => void;
  onSelectRecommendedStory: (story: Story) => void;
}

export const ImmersiveReaderModal: React.FC<ImmersiveReaderModalProps> = ({
  story,
  allStories,
  isSaved,
  savedChoiceId,
  onClose,
  onToggleBookmark,
  onRecordChoice,
  onCompleteStory,
  onUpdateWatchProgress,
  onSelectRecommendedStory,
}) => {
  const [playerMode, setPlayerMode] = useState<PlayerMode>('cinematic');
  const [visualStyle, setVisualStyle] = useState<'cinematic' | 'illustrated'>('cinematic');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(0.85);
  const [showCaptions, setShowCaptions] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [fontSize, setFontSize] = useState(19);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [guideExplanation, setGuideExplanation] = useState<{
    prompt: string;
    answer: string;
  } | null>(null);

  const playerSectionRef = useRef<HTMLDivElement>(null);
  const lastSpokenSceneRef = useRef<number>(-1);

  // Load browser SpeechSynthesis voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices.slice(0, 8));
        if (!selectedVoiceURI) {
          const preferred =
            voices.find((v) => v.lang.startsWith('en') && v.name.includes('Natural')) ||
            voices.find((v) => v.lang.startsWith('en')) ||
            voices[0];
          if (preferred) setSelectedVoiceURI(preferred.voiceURI);
        }
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoiceURI]);

  useEffect(() => {
    if (story) {
      setPlayerMode('cinematic');
      setVisualStyle(story.format === 'Illustrated' ? 'illustrated' : 'cinematic');
      setIsPlaying(false);
      setCurrentTime(0);
      setSelectedChoice(savedChoiceId || null);
      setGuideExplanation(null);
      lastSpokenSceneRef.current = -1;
    }
    return () => {
      soundEngine.stopAmbientDrone();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [story, savedChoiceId]);

  if (!story) return null;

  const scenes: StoryScene[] =
    story.scenes && story.scenes.length > 0
      ? story.scenes
      : buildScenesForStory(story);

  const totalDuration = scenes[scenes.length - 1]?.endTime || 44;

  // Determine active scene from currentTime (Section 11: Video + Image Synchronization Engine)
  const activeSceneIndex = Math.max(
    0,
    scenes.findIndex(
      (sc, idx) =>
        currentTime >= sc.startTime &&
        (currentTime < sc.endTime || idx === scenes.length - 1)
    )
  );
  const activeScene = scenes[activeSceneIndex] || scenes[0];

  // Determine active sentence inside the current scene based on scene progress
  const sceneDuration = Math.max(1, activeScene.endTime - activeScene.startTime);
  const sceneElapsed = Math.max(0, currentTime - activeScene.startTime);
  const sceneProgressRatio = Math.min(1, sceneElapsed / sceneDuration);
  const activeSentenceIndex = Math.min(
    activeScene.sentences.length - 1,
    Math.floor(sceneProgressRatio * activeScene.sentences.length)
  );

  // Speak scene narration via Web Speech API when playing & scene changes
  const triggerSceneSpeech = (scene: StoryScene) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(scene.narration);
      utterance.rate = playbackSpeed;
      utterance.volume = volume;
      utterance.pitch = 0.95;
      if (selectedVoiceURI) {
        const matched = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
        if (matched) utterance.voice = matched;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore speech synthesis errors
    }
  };

  // Master synchronized playback clock
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.25 * playbackSpeed;
        if (next >= totalDuration) {
          setIsPlaying(false);
          soundEngine.stopAmbientDrone();
          onCompleteStory(story.title);
          return totalDuration;
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalDuration, onCompleteStory, story.title]);

  // Synchronize voice narration and watch progress whenever activeSceneIndex changes
  useEffect(() => {
    if (onUpdateWatchProgress && currentTime > 0) {
      onUpdateWatchProgress(story.title, activeSceneIndex, Math.floor(currentTime));
    }
    if (isPlaying && lastSpokenSceneRef.current !== activeSceneIndex) {
      lastSpokenSceneRef.current = activeSceneIndex;
      triggerSceneSpeech(activeScene);
    }
  }, [activeSceneIndex, isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      soundEngine.stopAmbientDrone();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
        lastSpokenSceneRef.current = -1;
      }
      setIsPlaying(true);
      if (!isMuted) {
        soundEngine.startAmbientDrone(110);
        lastSpokenSceneRef.current = activeSceneIndex;
        triggerSceneSpeech(activeScene);
      }
    }
  };

  const handleReplay = () => {
    setCurrentTime(0);
    lastSpokenSceneRef.current = 0;
    setIsPlaying(true);
    if (!isMuted) {
      soundEngine.startAmbientDrone(110);
      triggerSceneSpeech(scenes[0]);
    }
  };

  const handleJumpToScene = (index: number) => {
    const target = scenes[index];
    if (!target) return;
    setCurrentTime(target.startTime);
    lastSpokenSceneRef.current = index;
    if (isPlaying && !isMuted) {
      triggerSceneSpeech(target);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      soundEngine.stopAmbientDrone();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else if (isPlaying) {
      soundEngine.startAmbientDrone(110);
      triggerSceneSpeech(activeScene);
    }
  };

  const formatTimecode = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChoiceSelect = (choiceId: string) => {
    soundEngine.playChime('choice');
    setSelectedChoice(choiceId);
    onRecordChoice(story.title, choiceId);
  };

  // Predefined story-aware Story Guide explanations inside the player (Section 17)
  const triggerGuidePrompt = (promptLabel: string) => {
    const p = promptLabel.toLowerCase();
    let answer = '';
    if (p.includes('explain')) {
      answer = `In ${activeScene.subtitle} ("${activeScene.title}"), ${activeScene.narration} Setting: ${story.context.setting}`;
    } else if (p.includes('summarize')) {
      answer = `${story.description} Core thematic inquiry: ${story.context.coreTheme}`;
    } else if (p.includes('before')) {
      answer = story.context.whatHappenedBefore;
    } else if (p.includes('who')) {
      answer = story.context.characters
        .map((c) => `${c.name} (${c.role}): ${c.description}`)
        .join(' • ');
    } else if (p.includes('matter')) {
      answer = story.context.whyItMatters;
    } else {
      answer = story.context.keyTakeaways.join(' • ');
    }
    setGuideExplanation({ prompt: promptLabel, answer });
  };

  const recommendations = allStories
    .filter((s) => s.id !== story.id)
    .sort((a, b) => {
      const scoreA =
        (a.category === story.category ? 3 : 0) +
        (a.mood === story.mood ? 2 : 0);
      const scoreB =
        (b.category === story.category ? 3 : 0) +
        (b.mood === story.mood ? 2 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 3);

  const transitionClass =
    activeScene.transition === 'kenburns'
      ? 'scene-transition-kenburns'
      : activeScene.transition === 'zoom'
      ? 'scene-transition-zoom'
      : activeScene.transition === 'parallax'
      ? 'scene-transition-parallax'
      : '';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050507]/96 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-3 md:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalStoryTitle"
    >
      <div
        className={`w-full ${
          playerMode === 'immersive'
            ? 'max-w-none h-screen'
            : 'max-w-[1480px] h-full sm:h-[95vh]'
        } bg-[#090a0f] border border-white/15 flex flex-col overflow-hidden relative shadow-[0_32px_100px_rgba(0,0,0,0.95)]`}
      >
        {/* Top Synchronized Timeline Progress Hairline */}
        <div className="w-full h-1 bg-[#11131a]">
          <div
            className="h-full bg-gradient-to-r from-[#ffc174] via-[#7bd0ff] to-[#d0bcff] transition-all duration-200"
            style={{
              width: `${Math.min(100, (currentTime / totalDuration) * 100)}%`,
            }}
          />
        </div>

        {/* Top Bar: Story Title + 4 Player Modes (Cinematic / Read / Listen / Immersive) + Controls */}
        <div className="px-4 sm:px-8 py-3.5 bg-[#050507] flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-[#ffc174] animate-ping' : 'bg-[#7bd0ff]'
              }`}
            />
            <h2
              id="modalStoryTitle"
              className="font-serif-editorial text-lg sm:text-2xl text-[#f4f2ed] font-normal truncate"
            >
              {story.title}
            </h2>
            <span className="hidden xl:inline text-[11px] font-mono-tabular uppercase tracking-wider text-[#7bd0ff]">
              {story.category} · {story.durationMinutes} MIN
            </span>
          </div>

          {/* Section 12: 4 Story Player Modes Switcher */}
          <div
            className="flex items-center border border-white/15 bg-[#090a0f]"
            role="tablist"
            aria-label="Story Player Modes"
          >
            {[
              { id: 'cinematic' as const, label: 'Cinematic', icon: Film },
              { id: 'read' as const, label: 'Read', icon: BookOpen },
              { id: 'listen' as const, label: 'Listen', icon: Headphones },
              { id: 'immersive' as const, label: 'Immersive', icon: Maximize2 },
            ].map((m) => {
              const Icon = m.icon;
              const active = playerMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPlayerMode(m.id)}
                  className={`px-3 py-1.5 text-[11px] font-mono-tabular uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#ffc174] text-[#1a0f00] font-bold'
                      : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Utility Actions: Cartoon Mode Toggle, Bookmark, Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setVisualStyle((prev) =>
                  prev === 'cinematic' ? 'illustrated' : 'cinematic'
                )
              }
              className={`px-3 py-1.5 text-[11px] font-mono-tabular uppercase tracking-wider border flex items-center gap-1.5 transition-colors cursor-pointer ${
                visualStyle === 'illustrated'
                  ? 'bg-[#d0bcff] text-[#23005c] border-[#d0bcff] font-bold'
                  : 'border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed]'
              }`}
              title="Toggle Cartoon / Illustrated Visual Storytelling Mode"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {visualStyle === 'illustrated'
                  ? 'Illustrated Mode: ON'
                  : 'Cartoon / Illustrated Mode'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(story.title)}
              className={`p-2 border border-white/15 hover:border-[#ffc174] transition-colors cursor-pointer ${
                isSaved ? 'text-[#ffc174]' : 'text-[#b8b0a4]'
              }`}
              aria-label="Save story to library"
              title="Save story to library"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 border border-white/15 hover:border-[#ffc174] text-[#b8b0a4] hover:text-[#f4f2ed] transition-colors cursor-pointer"
              aria-label="Close story experience"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Scrollable Story Detail & Synchronized Player Body */}
        <div className="flex-1 overflow-y-auto">
          {/* MODE 4: FULLSCREEN IMMERSIVE MODE */}
          {playerMode === 'immersive' ? (
            <div className="relative w-full h-[calc(100vh-56px)] bg-[#050507] overflow-hidden flex flex-col justify-between p-6 sm:p-12">
              <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeScene.id}-${visualStyle}`}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className={`w-full h-full ${transitionClass}`}
                  >
                    {visualStyle === 'illustrated' ? (
                      <IllustratedSceneCanvas
                        scene={activeScene}
                        storyTitle={story.title}
                      />
                    ) : (
                      <ResilientImage
                        src={activeScene.image}
                        alt={activeScene.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/40 to-[#050507]/60" />
              </div>

              {/* Top Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                    {activeScene.subtitle}
                  </div>
                  <h3 className="font-serif-editorial text-3xl sm:text-5xl text-[#f4f2ed]">
                    {activeScene.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPlayerMode('cinematic')}
                  className="bg-[#090a0f]/90 border border-white/20 px-4 py-2 text-xs font-mono-tabular uppercase tracking-wider text-[#f4f2ed] flex items-center gap-2 cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4 text-[#ffc174]" />
                  <span>Exit Fullscreen</span>
                </button>
              </div>

              {/* Bottom Synchronized Sentences + Controls */}
              <div className="relative z-10 max-w-4xl mx-auto w-full space-y-6 text-center">
                <div className="bg-[#050507]/85 backdrop-blur-xl border border-white/15 p-6 space-y-2">
                  {activeScene.sentences.map((sentence, sIdx) => {
                    const isCurrent = sIdx === activeSentenceIndex;
                    return (
                      <p
                        key={sIdx}
                        className={`font-serif-editorial text-xl sm:text-2xl transition-all duration-300 ${
                          isCurrent
                            ? 'text-[#ffc174] font-medium scale-[1.01]'
                            : 'text-[#f4f2ed]/55'
                        }`}
                      >
                        {sentence}
                      </p>
                    );
                  })}
                </div>

                {/* Scene Timeline Pills */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="bg-[#ffc174] text-[#1a0f00] px-6 py-3 text-xs font-mono-tabular font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Play Story
                      </>
                    )}
                  </button>
                  {scenes.map((sc, idx) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => handleJumpToScene(idx)}
                      className={`px-3.5 py-2.5 text-xs font-mono-tabular border cursor-pointer ${
                        idx === activeSceneIndex
                          ? 'bg-[#ffc174] text-[#1a0f00] border-[#ffc174] font-bold'
                          : 'bg-[#090a0f]/80 text-[#f4f2ed] border-white/20'
                      }`}
                    >
                      [0{sc.sceneNumber}]
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-8 lg:p-12 space-y-16 max-w-[1400px] mx-auto">
              {/* SECTION 15: STORY DETAIL HERO HEADER */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-white/10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#7bd0ff]">
                    <span className="text-[#ffc174]">{story.category}</span>
                    <span>·</span>
                    <span>{story.format}</span>
                    <span>·</span>
                    <span>{story.durationMinutes} MIN EXPERIENCE</span>
                    <span>·</span>
                    <span className="text-[#d0bcff]">MOOD: {story.mood}</span>
                  </div>

                  <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#f4f2ed] font-normal leading-[1.04]">
                    {story.title}
                  </h1>

                  <p className="text-base sm:text-lg text-[#b8b0a4] font-light leading-relaxed max-w-2xl">
                    {story.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        playerSectionRef.current?.scrollIntoView({
                          behavior: 'smooth',
                        });
                        if (!isPlaying) handleTogglePlay();
                      }}
                      className="bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] px-7 py-3.5 text-xs font-mono-tabular font-bold uppercase tracking-[0.18em] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>
                        {isPlaying ? 'Playing Synchronized Story' : 'Start Story Experience'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setVisualStyle((prev) =>
                          prev === 'cinematic' ? 'illustrated' : 'cinematic'
                        )
                      }
                      className="border border-white/20 hover:border-[#ffc174] text-[#f4f2ed] px-5 py-3.5 text-xs font-mono-tabular uppercase tracking-[0.16em] flex items-center gap-2 cursor-pointer"
                    >
                      <Palette className="w-4 h-4 text-[#d0bcff]" />
                      <span>
                        {visualStyle === 'illustrated'
                          ? 'Switch to Cinematic Visuals'
                          : 'Switch to Illustrated / Cartoon Mode'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Story DNA Fingerprint inside Story Detail Header */}
                <div className="lg:col-span-5">
                  <StoryDNAVisualizer
                    dna={story.dna}
                    storyTitle={story.title}
                    mood={story.mood}
                  />
                </div>
              </div>

              {/* SECTION 4–12: SYNCHRONIZED CINEMATIC STORY PLAYER */}
              {playerMode !== 'read' && (
                <div ref={playerSectionRef} className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                      <Film className="w-4 h-4" />
                      <span>
                        CINEMATIC STORY PLAYER // VIDEO + VOICE + LIVE TEXT + SCENE TIMELINE
                      </span>
                    </div>
                    <div className="text-xs font-mono-tabular text-[#7bd0ff]">
                      TRANSITION: {activeScene.transition.toUpperCase()} · TIME:{' '}
                      {formatTimecode(currentTime)} / {formatTimecode(totalDuration)}
                    </div>
                  </div>

                  {/* Desktop Split Layout: LEFT = Video/Scene Stage (7 cols), RIGHT = Story Narration & Voice Guide Panel (5 cols) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* LEFT: Large Cinematic Video + Scene Image Stage */}
                    <div className="lg:col-span-7 flex flex-col justify-between bg-[#050507] border border-white/15 overflow-hidden relative min-h-[340px] sm:min-h-[440px]">
                      <div className="relative flex-1 w-full h-full overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${activeScene.id}-${visualStyle}`}
                            initial={{
                              opacity: 0,
                              scale: activeScene.transition === 'zoom' ? 0.94 : 1.03,
                              x: activeScene.transition === 'slide' ? 40 : 0,
                              filter:
                                activeScene.transition === 'blur'
                                  ? 'blur(10px)'
                                  : 'blur(0px)',
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              x: 0,
                              filter: 'blur(0px)',
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.65, ease: 'easeOut' }}
                            className={`absolute inset-0 w-full h-full ${transitionClass}`}
                          >
                            {visualStyle === 'illustrated' ? (
                              <IllustratedSceneCanvas
                                scene={activeScene}
                                storyTitle={story.title}
                              />
                            ) : (
                              <ResilientImage
                                src={activeScene.image}
                                alt={activeScene.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Animated Documentary Film Grain & Atmospheric Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/50 pointer-events-none" />

                        {/* Top-Right Video Stream Status Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#050507]/85 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] font-mono-tabular uppercase tracking-widest text-[#f4f2ed]">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isPlaying
                                ? 'bg-[#ffc174] animate-ping'
                                : 'bg-white/40'
                            }`}
                          />
                          <span>
                            SCENE 0{activeScene.sceneNumber} / 0{scenes.length}
                          </span>
                        </div>

                        {/* Center Play Overlay Button when Paused */}
                        {!isPlaying && (
                          <button
                            type="button"
                            onClick={handleTogglePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors cursor-pointer group"
                            aria-label="Play synchronized story"
                          >
                            <div className="w-16 h-16 bg-[#ffc174] text-[#1a0f00] flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform">
                              <Play className="w-7 h-7 fill-current ml-0.5" />
                            </div>
                          </button>
                        )}

                        {/* Live Synchronized On-Screen Subtitle Overlay */}
                        {showCaptions && (
                          <div className="absolute bottom-4 left-4 right-4 bg-[#050507]/90 backdrop-blur-md border-l-2 border-[#ffc174] px-4 py-3">
                            <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174] mb-0.5">
                              {activeScene.title}
                            </div>
                            <p className="font-serif-editorial italic text-base sm:text-lg text-[#f4f2ed]">
                              “{activeScene.sentences[activeSentenceIndex] || activeScene.narration}”
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Video Stage Bottom Transport Bar */}
                      <div className="px-4 py-3 bg-[#050507] border-t border-white/10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleTogglePlay}
                            className="bg-[#ffc174] text-[#1a0f00] px-3.5 py-1.5 text-xs font-mono-tabular font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5" /> Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" /> Play
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleReplay}
                            className="p-1.5 border border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
                            title="Replay Story from Scene 01"
                            aria-label="Replay Story"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex-1 mx-2">
                          <input
                            type="range"
                            min={0}
                            max={totalDuration}
                            step={0.5}
                            value={currentTime}
                            onChange={(e) => setCurrentTime(Number(e.target.value))}
                            className="w-full accent-[#ffc174] cursor-pointer"
                            aria-label="Story timeline scrubber"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowCaptions(!showCaptions)}
                            className={`p-1.5 border text-xs cursor-pointer ${
                              showCaptions
                                ? 'border-[#ffc174] text-[#ffc174]'
                                : 'border-white/15 text-[#b8b0a4]'
                            }`}
                            title="Toggle Subtitles"
                            aria-label="Toggle Subtitles"
                          >
                            <Subtitles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setPlayerMode('immersive')}
                            className="p-1.5 border border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
                            title="Fullscreen Immersive Mode"
                            aria-label="Fullscreen Immersive Mode"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Synchronized Story Narration Panel & Voice Story Guide Controls */}
                    <div className="lg:col-span-5 bg-[#050507] border border-white/15 p-6 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div>
                            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                              {activeScene.subtitle}
                            </div>
                            <h3 className="font-serif-editorial text-2xl text-[#f4f2ed] mt-0.5">
                              {activeScene.title}
                            </h3>
                          </div>
                          {/* Voice Activity Indicator */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 border border-white/15 bg-[#090a0f]">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isPlaying && !isMuted
                                  ? 'bg-[#7bd0ff] animate-ping'
                                  : 'bg-white/30'
                              }`}
                            />
                            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#7bd0ff]">
                              {isPlaying && !isMuted
                                ? 'VOICE ACTIVE'
                                : isMuted
                                ? 'MUTED'
                                : 'STANDBY'}
                            </span>
                          </div>
                        </div>

                        {/* Section 9: Live Synchronized Sentence-by-Sentence Story Text */}
                        <div className="space-y-3 py-2">
                          <div className="text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#b8b0a4]">
                            LIVE SYNCHRONIZED NARRATION TRANSCRIPT
                          </div>
                          <div className="space-y-2.5">
                            {activeScene.sentences.map((sentence, idx) => {
                              const isActiveSentence = idx === activeSentenceIndex;
                              return (
                                <motion.p
                                  key={idx}
                                  animate={{
                                    x: isActiveSentence ? 4 : 0,
                                    opacity: isActiveSentence ? 1 : 0.55,
                                  }}
                                  className={`font-serif-editorial text-lg leading-relaxed transition-colors pl-3 border-l-2 ${
                                    isActiveSentence
                                      ? 'border-[#ffc174] text-[#f4f2ed] font-medium bg-white/[0.03] py-1'
                                      : 'border-transparent text-[#b8b0a4]'
                                  }`}
                                >
                                  “{sentence}”
                                </motion.p>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Section 8: VOICE STORY GUIDE CONTROLS (Play, Pause, Replay, Mute, Speed, Volume, Voice) */}
                      <div className="pt-4 border-t border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                            STORY GUIDE // VOICE NARRATOR CONTROLS
                          </span>
                          <span className="text-[10px] font-mono-tabular text-[#b8b0a4]">
                            SCENE PROGRESS: {Math.round(sceneProgressRatio * 100)}%
                          </span>
                        </div>

                        {/* Scene Progress Bar */}
                        <div className="w-full h-1.5 bg-[#11131a] overflow-hidden">
                          <div
                            className="h-full bg-[#7bd0ff] transition-all duration-200"
                            style={{ width: `${sceneProgressRatio * 100}%` }}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={handleTogglePlay}
                            className="bg-[#ffc174] text-[#1a0f00] py-2.5 px-3 text-xs font-mono-tabular font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5" /> Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5" /> Play
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={handleReplay}
                            className="bg-[#090a0f] hover:border-[#ffc174] border border-white/15 text-[#f4f2ed] py-2.5 px-3 text-xs font-mono-tabular uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-[#ffc174]" />
                            <span>Replay</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleToggleMute}
                            className={`py-2.5 px-3 text-xs font-mono-tabular uppercase tracking-wider border flex items-center justify-center gap-1.5 cursor-pointer ${
                              isMuted
                                ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]'
                                : 'bg-[#090a0f] border-white/15 text-[#f4f2ed]'
                            }`}
                          >
                            {isMuted ? (
                              <>
                                <VolumeX className="w-3.5 h-3.5" /> Muted
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-[#7bd0ff]" /> Mute
                              </>
                            )}
                          </button>
                        </div>

                        {/* Speed + Volume + Browser Voice Selector */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="block text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1">
                              Narration Speed ({playbackSpeed}x)
                            </label>
                            <div className="flex items-center border border-white/15">
                              {[0.8, 1, 1.25, 1.5].map((spd) => (
                                <button
                                  key={spd}
                                  type="button"
                                  onClick={() => setPlaybackSpeed(spd)}
                                  className={`flex-1 py-1 text-[11px] font-mono-tabular cursor-pointer ${
                                    playbackSpeed === spd
                                      ? 'bg-[#ffc174] text-[#1a0f00] font-bold'
                                      : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                                  }`}
                                >
                                  {spd}x
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1">
                              Voice Volume ({Math.round(volume * 100)}%)
                            </label>
                            <input
                              type="range"
                              min={0.1}
                              max={1}
                              step={0.05}
                              value={volume}
                              onChange={(e) => setVolume(Number(e.target.value))}
                              className="w-full accent-[#7bd0ff] cursor-pointer mt-1.5"
                              aria-label="Voice volume"
                            />
                          </div>
                        </div>

                        {availableVoices.length > 0 && (
                          <div>
                            <label className="block text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1">
                              Narrator Voice Profile
                            </label>
                            <select
                              value={selectedVoiceURI}
                              onChange={(e) => setSelectedVoiceURI(e.target.value)}
                              className="w-full bg-[#090a0f] border border-white/15 text-xs text-[#f4f2ed] p-2 focus:outline-none"
                            >
                              {availableVoices.map((v) => (
                                <option key={v.voiceURI} value={v.voiceURI}>
                                  {v.name} ({v.lang})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5 & 10: SYNCHRONIZED SCENE TIMELINE ([01] [02] [03] [04] [05]) */}
                  <div className="bg-[#050507] border border-white/15 p-5">
                    <div className="flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4] mb-3">
                      <span>SYNCHRONIZED SCENE TIMELINE — CLICK ANY SCENE NODE</span>
                      <span className="text-[#ffc174]">
                        ACTIVE: [0{activeScene.sceneNumber}] {activeScene.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {scenes.map((sc, idx) => {
                        const isCurrent = idx === activeSceneIndex;
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            onClick={() => handleJumpToScene(idx)}
                            className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                              isCurrent
                                ? 'bg-[#11131a] border-[#ffc174] shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                                : 'bg-[#090a0f] hover:bg-[#11131a] border-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono-tabular mb-1.5">
                              <span
                                className={
                                  isCurrent
                                    ? 'text-[#ffc174] font-bold'
                                    : 'text-[#7bd0ff]'
                                }
                              >
                                [0{sc.sceneNumber}]
                              </span>
                              <span className="text-[#b8b0a4]">
                                {formatTimecode(sc.startTime)}–{formatTimecode(sc.endTime)}
                              </span>
                            </div>
                            <div className="font-serif-editorial text-sm text-[#f4f2ed] truncate">
                              {sc.title}
                            </div>
                            <div className="text-[10px] text-[#b8b0a4] truncate mt-1">
                              {sc.narration}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 17: INTEGRATED STORY GUIDE CONTEXTUAL ASSISTANT */}
              <div className="bg-[#050507] border border-[#ffc174]/35 p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <div className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>AI STORY GUIDE · SCENE &amp; LORE COMPANION</span>
                    </div>
                    <p className="text-xs text-[#b8b0a4] mt-1">
                      Predefined story-aware responses grounded in &ldquo;{story.title}&rdquo; and Scene 0{activeScene.sceneNumber}.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    'Explain this scene',
                    'Summarize this story',
                    'What happened before?',
                    'Who is this?',
                    'Why does this matter?',
                    'What should I remember?',
                  ].map((btnLabel) => (
                    <button
                      key={btnLabel}
                      type="button"
                      onClick={() => triggerGuidePrompt(btnLabel)}
                      className="bg-[#090a0f] hover:bg-[#11131a] border border-white/15 hover:border-[#ffc174] text-xs font-mono-tabular uppercase tracking-wider text-[#f4f2ed] px-3.5 py-2 transition-colors cursor-pointer"
                    >
                      {btnLabel}
                    </button>
                  ))}
                </div>

                {guideExplanation && (
                  <div className="p-4 bg-[#090a0f] border-l-2 border-[#ffc174] space-y-1">
                    <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174]">
                      STORY GUIDE // {guideExplanation.prompt.toUpperCase()}
                    </div>
                    <p className="font-serif-editorial text-lg text-[#f4f2ed] leading-relaxed">
                      {guideExplanation.answer}
                    </p>
                  </div>
                )}
              </div>

              {/* STORY CHAPTERS & INTERACTIVE BRANCHING CHOICES */}
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                    FULL MANUSCRIPT CHAPTERS &amp; INTERACTIVE CHOICES
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFontSize((f) => Math.max(15, f - 1))}
                      className="px-2.5 py-1 border border-white/15 text-xs font-mono-tabular text-[#b8b0a4]"
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontSize((f) => Math.min(24, f + 1))}
                      className="px-2.5 py-1 border border-white/15 text-xs font-mono-tabular text-[#b8b0a4]"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {story.chapters.map((chapter, idx) => {
                  const chosenOption = chapter.choices?.find(
                    (c) => c.id === selectedChoice
                  );

                  return (
                    <section
                      key={chapter.id}
                      className="space-y-6 pt-6 border-t border-white/[0.07] first:border-t-0 first:pt-0"
                    >
                      <div>
                        <span className="text-[11px] font-mono-tabular text-[#ffc174] uppercase tracking-[0.22em] block mb-1">
                          {chapter.subtitle} · {chapter.stageName}
                        </span>
                        <h3 className="font-serif-editorial text-3xl text-[#f4f2ed] font-normal">
                          {chapter.title}
                        </h3>
                      </div>

                      {chapter.paragraphs.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          style={{
                            fontSize: `${fontSize}px`,
                            lineHeight: `${Math.round(fontSize * 1.7)}px`,
                          }}
                          className={`text-[#f4f2ed]/90 font-light ${
                            pIdx === 0 && idx === 0
                              ? 'first-letter:text-5xl first-letter:font-serif-editorial first-letter:text-[#ffc174] first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                              : ''
                          }`}
                        >
                          {para}
                        </p>
                      ))}

                      {chapter.choices && chapter.choices.length > 0 && (
                        <div className="bg-[#050507] p-6 border border-[#ffc174]/40 space-y-4">
                          <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#ffc174]">
                            INTERACTIVE DECISION // {chapter.choicePrompt}
                          </div>
                          <div className="space-y-2.5">
                            {chapter.choices.map((choice) => {
                              const isPicked = selectedChoice === choice.id;
                              return (
                                <button
                                  key={choice.id}
                                  type="button"
                                  onClick={() => handleChoiceSelect(choice.id)}
                                  className={`w-full p-4 text-left border flex items-center justify-between gap-4 cursor-pointer ${
                                    isPicked
                                      ? 'bg-[#11131a] border-[#ffc174]'
                                      : 'bg-[#090a0f] border-white/10 hover:border-white/30'
                                  }`}
                                >
                                  <div>
                                    <div className="text-xs font-mono-tabular font-bold uppercase text-[#f4f2ed]">
                                      {choice.label}
                                    </div>
                                    <div className="text-xs text-[#b8b0a4] mt-1">
                                      {choice.description}
                                    </div>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-[#ffc174] shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                          {chosenOption && (
                            <div className="p-4 bg-[#090a0f] border-l-2 border-[#ffc174] text-xs text-[#f4f2ed]">
                              <strong className="text-[#ffc174] block uppercase font-mono-tabular mb-1">
                                Consequence Recorded:
                              </strong>
                              {chosenOption.consequenceText}
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>

              {/* RELATED STORIES */}
              <div className="pt-10 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                    RELATED STORIES // CONTINUE YOUR EXPEDITION
                  </span>
                  <span className="text-xs font-mono-tabular text-[#b8b0a4]">
                    Matched by Story DNA
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {recommendations.map((rec) => (
                    <button
                      key={rec.id}
                      type="button"
                      onClick={() => onSelectRecommendedStory(rec)}
                      className="bg-[#050507] hover:bg-[#11131a] border border-white/10 hover:border-[#ffc174]/50 p-5 text-left transition-all group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#7bd0ff]">
                          {rec.category} · {rec.durationMinutes} MIN
                        </span>
                        <h5 className="font-serif-editorial text-2xl text-[#f4f2ed] group-hover:text-[#ffc174] mt-1 mb-2">
                          {rec.title}
                        </h5>
                        <p className="text-xs text-[#b8b0a4] line-clamp-2">
                          {rec.description}
                        </p>
                      </div>
                      <span className="mt-4 text-[11px] font-mono-tabular uppercase tracking-wider text-[#ffc174] flex items-center gap-1">
                        <span>Enter Story</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
