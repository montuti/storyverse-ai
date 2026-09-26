import React, { useState, useEffect } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Pause,
  Play,
  BookOpen,
} from 'lucide-react';
import { Story } from '../types/story';
import { soundEngine } from '../utils/soundEngine';

interface StoryGuideAIProps {
  activeStory: Story;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

type VoiceState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING';

export const StoryGuideAI: React.FC<StoryGuideAIProps> = ({
  activeStory,
  externalOpen,
  onExternalOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof externalOpen === 'boolean') {
      setIsOpen(externalOpen);
    }
  }, [externalOpen]);

  const toggleOpen = (next: boolean) => {
    setIsOpen(next);
    if (onExternalOpenChange) onExternalOpenChange(next);
  };

  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');
  const [isPausedSpeech, setIsPausedSpeech] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [activeLens, setActiveLens] = useState<
    'scene' | 'characters' | 'before' | 'takeaways' | 'custom'
  >('scene');
  const [customInquiryTitle, setCustomInquiryTitle] = useState<string>(
    'EXPLAIN THIS SCENE'
  );
  const [customAnnotation, setCustomAnnotation] = useState<string | null>(null);

  const generateGroundedResponse = (query: string, story: Story): string => {
    const q = query.toLowerCase();
    const ctx = story.context;
    const ch1 = story.chapters[0];

    if (q.includes('explain') || q.includes('scene')) {
      return `Set in ${ctx.setting} (${ctx.timeline}). In "${ch1.title}", ${ch1.paragraphs[0]} The central dramatic question asks: ${ctx.coreTheme}`;
    }
    if (q.includes('summarize') || q.includes('summary')) {
      return `${story.description} Spanning ${story.chapters.length} chapters (${story.durationMinutes} minutes), this work examines ${ctx.coreTheme.toLowerCase()}`;
    }
    if (q.includes('who') || q.includes('character') || q.includes('traveler')) {
      return ctx.characters
        .map((c) => `${c.name} (${c.role}) — ${c.description}`)
        .join(' • ');
    }
    if (q.includes('why') || q.includes('matter')) {
      return `${ctx.whyItMatters} Thematic anchor: ${ctx.coreTheme}`;
    }
    if (q.includes('before') || q.includes('history') || q.includes('happened')) {
      return ctx.whatHappenedBefore;
    }
    if (q.includes('remember') || q.includes('takeaway')) {
      return ctx.keyTakeaways.join(' • ');
    }

    return `Grounded in "${story.title}" (${ctx.setting}): ${story.description} Prior context: ${ctx.whatHappenedBefore} Key takeaway: ${ctx.keyTakeaways[0]}`;
  };

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.96;
    utterance.pitch = 0.94;
    utterance.onstart = () => {
      setVoiceState('SPEAKING');
      setIsPausedSpeech(false);
    };
    utterance.onend = () => {
      setVoiceState('IDLE');
      setIsPausedSpeech(false);
    };
    utterance.onerror = () => {
      setVoiceState('IDLE');
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitQuery = (rawQuery: string, autoSpeak = false) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) return;

    setInputQuery('');
    setVoiceState('THINKING');
    setCustomInquiryTitle(trimmed.toUpperCase());
    setActiveLens('custom');

    setTimeout(() => {
      const answer = generateGroundedResponse(trimmed, activeStory);
      setCustomAnnotation(answer);
      soundEngine.playChime('discover');

      if (autoSpeak) {
        speakResponse(answer);
      } else {
        setVoiceState('IDLE');
      }
    }, 220);
  };

  const handleTalkButton = () => {
    if (voiceState === 'LISTENING') {
      setVoiceState('IDLE');
      return;
    }

    const SpeechRec =
      (
        window as unknown as {
          SpeechRecognition?: new () => any;
          webkitSpeechRecognition?: new () => any;
        }
      ).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => any })
        .webkitSpeechRecognition;

    if (!SpeechRec) {
      setVoiceState('LISTENING');
      setTimeout(() => {
        handleSubmitQuery('Explain this scene', true);
      }, 800);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setVoiceState('LISTENING');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          handleSubmitQuery(transcript, true);
        } else {
          setVoiceState('IDLE');
        }
      };

      recognition.onerror = () => {
        setVoiceState('IDLE');
      };

      recognition.onend = () => {
        setVoiceState((prev) => (prev === 'LISTENING' ? 'IDLE' : prev));
      };

      recognition.start();
    } catch {
      setVoiceState('IDLE');
    }
  };

  const currentReadingText =
    activeLens === 'custom' && customAnnotation
      ? customAnnotation
      : activeLens === 'scene'
      ? `${activeStory.context.setting}. ${activeStory.chapters[0].paragraphs[0]}`
      : activeLens === 'characters'
      ? activeStory.context.characters
          .map((c) => `${c.name}, ${c.role}: ${c.description}`)
          .join('. ')
      : activeLens === 'before'
      ? `${activeStory.context.whatHappenedBefore} ${activeStory.context.whyItMatters}`
      : activeStory.context.keyTakeaways.join('. ');

  const handleListenCurrent = () => {
    if (voiceState === 'SPEAKING') {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setVoiceState('IDLE');
      setIsPausedSpeech(false);
      return;
    }
    speakResponse(currentReadingText);
  };

  const togglePauseResumeSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPausedSpeech) {
      window.speechSynthesis.resume();
      setIsPausedSpeech(false);
    } else {
      window.speechSynthesis.pause();
      setIsPausedSpeech(true);
    }
  };

  // Section 17: Required Preset Buttons
  const presetActions = [
    'Explain this scene',
    'Summarize this story',
    'What happened before?',
    'Who is this?',
    'Why does this matter?',
    'What should I remember?',
  ];

  return (
    <div className="fixed bottom-16 xl:bottom-6 right-5 md:right-8 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="w-[340px] sm:w-[440px] bg-[#090a0f]/98 backdrop-blur-2xl border border-[#ffc174]/40 shadow-[0_24px_80px_rgba(0,0,0,0.9)] mb-3 flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 bg-[#050507] border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    voiceState === 'LISTENING'
                      ? 'bg-[#ffb4ab] animate-ping'
                      : voiceState === 'SPEAKING'
                      ? 'bg-[#7bd0ff] animate-pulse'
                      : 'bg-[#ffc174]'
                  }`}
                />
                <span className="text-xs font-mono-tabular font-bold uppercase tracking-[0.2em] text-[#ffc174]">
                  STORY GUIDE · LORE LENS
                </span>
                <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 border border-white/15 text-[#7bd0ff]">
                  {voiceState}
                </span>
              </div>
              <p className="text-[11px] font-serif-editorial italic text-[#b8b0a4] mt-0.5">
                Predefined story-aware companion · Grounded in “{activeStory.title}”
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggleOpen(false)}
              className="text-[#b8b0a4] hover:text-[#f4f2ed] p-1 cursor-pointer"
              aria-label="Collapse Story Guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Instant Architectural Lens Tabs */}
          <div className="grid grid-cols-4 border-b border-white/10 bg-[#050507] text-[10px] font-mono-tabular uppercase tracking-wider">
            {[
              { id: 'scene' as const, label: '01 Scene' },
              { id: 'characters' as const, label: '02 Cast' },
              { id: 'before' as const, label: '03 Origins' },
              { id: 'takeaways' as const, label: '04 Core' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveLens(tab.id)}
                className={`py-2.5 text-center border-b-2 transition-colors cursor-pointer ${
                  activeLens === tab.id
                    ? 'border-[#ffc174] text-[#ffc174] font-bold bg-white/[0.03]'
                    : 'border-transparent text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Voice Waveform Activity Strip */}
          {voiceState !== 'IDLE' && (
            <div className="px-5 py-2.5 bg-[#11131a] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                  <span
                    key={bar}
                    className={`w-0.5 animate-pulse ${
                      voiceState === 'LISTENING'
                        ? 'bg-[#ffb4ab] h-3.5'
                        : voiceState === 'THINKING'
                        ? 'bg-[#ffc174] h-2.5'
                        : 'bg-[#7bd0ff] h-4'
                    }`}
                  />
                ))}
                <span className="text-[11px] font-mono-tabular text-[#f4f2ed] ml-2">
                  {voiceState === 'LISTENING' && 'LISTENING FOR VOICE INQUIRY...'}
                  {voiceState === 'THINKING' && 'INDEXING STORY CONTEXT...'}
                  {voiceState === 'SPEAKING' &&
                    (isPausedSpeech ? 'VOICE PAUSED' : 'NARRATING RESPONSE...')}
                </span>
              </div>

              {voiceState === 'SPEAKING' && (
                <button
                  type="button"
                  onClick={togglePauseResumeSpeech}
                  className="text-[11px] font-mono-tabular uppercase text-[#ffc174] flex items-center gap-1 cursor-pointer"
                >
                  {isPausedSpeech ? (
                    <>
                      <Play className="w-3 h-3" /> Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3" /> Pause
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Manuscript Marginalia Content Area */}
          <div className="p-5 max-h-60 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#7bd0ff]">
              <span>STORY-AWARE PROTOTYPE ENGINE</span>
              <span>{activeStory.durationMinutes}M ARC</span>
            </div>

            {activeLens === 'scene' && (
              <div className="space-y-3">
                <div className="text-xs font-mono-tabular text-[#ffc174]">
                  SETTING: {activeStory.context.setting}
                </div>
                <p className="font-serif-editorial text-base text-[#f4f2ed] leading-relaxed">
                  {activeStory.chapters[0].paragraphs[0]}
                </p>
                <div className="pt-2 border-t border-white/[0.07] text-xs text-[#b8b0a4]">
                  <strong className="text-[#f4f2ed] font-normal uppercase font-mono-tabular tracking-wider block mb-1">
                    Thematic Axis:
                  </strong>
                  {activeStory.context.coreTheme}
                </div>
              </div>
            )}

            {activeLens === 'characters' && (
              <div className="space-y-3">
                {activeStory.context.characters.map((char) => (
                  <div
                    key={char.name}
                    className="border-l-2 border-[#ffc174] pl-3.5 py-0.5"
                  >
                    <div className="font-serif-editorial text-lg text-[#f4f2ed]">
                      {char.name}
                    </div>
                    <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#7bd0ff] mb-1">
                      {char.role}
                    </div>
                    <p className="text-xs text-[#b8b0a4] leading-relaxed">
                      {char.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeLens === 'before' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174] mb-1">
                    What Happened Before
                  </div>
                  <p className="text-xs sm:text-sm text-[#f4f2ed] leading-relaxed">
                    {activeStory.context.whatHappenedBefore}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/[0.07]">
                  <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#7bd0ff] mb-1">
                    Why This Matters
                  </div>
                  <p className="text-xs sm:text-sm text-[#b8b0a4] leading-relaxed">
                    {activeStory.context.whyItMatters}
                  </p>
                </div>
              </div>
            )}

            {activeLens === 'takeaways' && (
              <div className="space-y-2.5">
                <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174]">
                  What You Should Remember
                </div>
                {activeStory.context.keyTakeaways.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#f4f2ed]">
                    <span className="font-mono-tabular text-[#ffc174]">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeLens === 'custom' && (
              <div className="space-y-2.5 border-l-2 border-[#ffc174] pl-4">
                <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174]">
                  INQUIRY // {customInquiryTitle}
                </div>
                <p className="font-serif-editorial text-base text-[#f4f2ed] leading-relaxed">
                  {customAnnotation}
                </p>
              </div>
            )}
          </div>

          {/* 6 One-Click Contextual Prompts */}
          <div className="px-5 py-3 bg-[#050507] border-t border-white/10">
            <div className="text-[9px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4] mb-2">
              STORY-AWARE PROMPTS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleSubmitQuery(action, false)}
                  className="bg-[#11131a] hover:bg-white/[0.08] border border-white/10 hover:border-[#ffc174]/50 text-[#f4f2ed] px-2 py-1 text-[10px] font-mono-tabular uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Acoustic & Direct Inquiry Footer */}
          <div className="p-4 bg-[#050507] border-t border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleTalkButton}
                className={`py-2 px-3 text-[11px] font-mono-tabular font-semibold uppercase tracking-widest flex items-center justify-center gap-2 border transition-colors cursor-pointer ${
                  voiceState === 'LISTENING'
                    ? 'bg-[#ffb4ab] text-[#690005] border-[#ffb4ab]'
                    : 'bg-[#090a0f] hover:border-[#ffc174] text-[#f4f2ed] border-white/15'
                }`}
              >
                {voiceState === 'LISTENING' ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Stop Mic</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-[#ffc174]" />
                    <span>Voice Ask</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleListenCurrent}
                className={`py-2 px-3 text-[11px] font-mono-tabular font-semibold uppercase tracking-widest flex items-center justify-center gap-2 border transition-colors cursor-pointer ${
                  voiceState === 'SPEAKING'
                    ? 'bg-[#7bd0ff] text-[#001e2c] border-[#7bd0ff]'
                    : 'bg-[#090a0f] hover:border-[#7bd0ff] text-[#f4f2ed] border-white/15'
                }`}
              >
                {voiceState === 'SPEAKING' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Silence</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#7bd0ff]" />
                    <span>Read Aloud</span>
                  </>
                )}
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitQuery(inputQuery, false);
              }}
              className="flex items-center gap-2 border-b border-white/20 focus-within:border-[#ffc174] pb-1.5"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Story Guide about this world..."
                className="flex-1 bg-transparent text-xs text-[#f4f2ed] placeholder:text-[#b8b0a4]/60 focus:outline-none"
              />
              <button
                type="submit"
                className="text-[#ffc174] hover:text-[#f4f2ed] p-1 transition-colors cursor-pointer"
                aria-label="Submit inquiry"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Collapsed Architectural Companion HUD Pill */}
      <button
        type="button"
        onClick={() => toggleOpen(!isOpen)}
        className="group flex items-center gap-3 bg-[#090a0f]/95 backdrop-blur-xl border border-[#ffc174]/50 hover:border-[#ffc174] text-[#f4f2ed] px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all cursor-pointer"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            voiceState !== 'IDLE' ? 'bg-[#7bd0ff] animate-ping' : 'bg-[#ffc174]'
          }`}
        />
        <div className="text-left">
          <div className="text-[10px] font-mono-tabular font-bold uppercase tracking-[0.2em] text-[#ffc174]">
            STORY GUIDE
          </div>
          <div className="text-[11px] text-[#b8b0a4] hidden sm:block max-w-[160px] truncate">
            {activeStory.title}
          </div>
        </div>
        <BookOpen className="w-3.5 h-3.5 text-[#ffc174] ml-1 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
