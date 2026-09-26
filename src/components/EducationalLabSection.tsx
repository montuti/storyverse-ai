import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sliders,
} from 'lucide-react';
import { EDUCATIONAL_AI_STAGES, STORIES } from '../data/stories';
import { Story } from '../types/story';

interface EducationalLabSectionProps {
  onOpenStory: (story: Story) => void;
}

export const EducationalLabSection: React.FC<EducationalLabSectionProps> = ({
  onOpenStory,
}) => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [sliderVal, setSliderVal] = useState(
    EDUCATIONAL_AI_STAGES[0].interactiveDefaultValue
  );
  const [stageQuizSelection, setStageQuizSelection] = useState<
    Record<string, number | null>
  >({});

  const currentStage = EDUCATIONAL_AI_STAGES[activeStageIdx];

  const handleStageChange = (index: number) => {
    setActiveStageIdx(index);
    setSliderVal(EDUCATIONAL_AI_STAGES[index].interactiveDefaultValue);
  };

  const openLinkedStory = (titleQuery: string) => {
    const match =
      STORIES.find((s) =>
        s.title.toLowerCase().includes(titleQuery.toLowerCase())
      ) || STORIES[0];
    onOpenStory(match);
  };

  const curriculumTracks = [
    {
      num: '01',
      title: 'How AI Works',
      domain: 'Neural Computation',
      desc: 'Trace backpropagation from the perspective of an electrical signal traversing 175 billion weights.',
      actionLabel: 'Active Interactive Module Below',
      onClick: () => handleStageChange(2),
    },
    {
      num: '02',
      title: 'Space Exploration',
      domain: 'Astrophysics & Latency',
      desc: 'Relive interplanetary telemetry crises through raw sensor logs and speed-of-light communication delays.',
      actionLabel: 'Enter Story: Letters From Mars',
      onClick: () => openLinkedStory('Letters From Mars'),
    },
    {
      num: '03',
      title: 'Climate Feedback Loops',
      domain: 'Atmospheric Physics',
      desc: 'Experience supercell thermodynamics and Navier-Stokes fluid vortices across warming oceans.',
      actionLabel: 'Enter Story: Mathematics of a Storm',
      onClick: () => openLinkedStory('The Mathematics of a Storm'),
    },
    {
      num: '04',
      title: 'Quantum Superposition',
      domain: 'Quantum Mechanics',
      desc: 'Make narrative choices where both outcomes remain simultaneously true until observation collapses the wave.',
      actionLabel: 'Enter Story: Quantum Cartographer',
      onClick: () => openLinkedStory('The Quantum Cartographer'),
    },
  ];

  return (
    <section
      id="educational"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 bg-[#090a0f] border-t border-white/[0.08]"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08] mb-12">
        <div className="lg:col-span-7">
          <div className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#7bd0ff] mb-3">
            04 / EDUCATIONAL STORYTELLING MODE
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#f4f2ed] font-normal tracking-tight leading-none">
            How Artificial Intelligence{' '}
            <span className="italic text-[#ffc174]">Learns.</span>
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-base text-[#b8b0a4] font-light leading-relaxed">
            Instead of a static textbook article, explore machine learning as a six-stage interactive narrative—manipulating vector embeddings, gradient descent, and attention weights directly.
          </p>
        </div>
      </div>

      {/* 6-Stage Architectural Timeline Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-y border-white/[0.1] mb-12">
        {EDUCATIONAL_AI_STAGES.map((stage, i) => {
          const isActive = i === activeStageIdx;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => handleStageChange(i)}
              className={`p-4 text-left transition-all cursor-pointer border-b-2 sm:border-r sm:last:border-r-0 border-r-white/[0.06] ${
                isActive
                  ? 'bg-white/[0.04] border-b-[#ffc174] text-[#ffc174]'
                  : 'border-b-transparent text-[#b8b0a4] hover:text-[#f4f2ed]'
              }`}
            >
              <div className="text-[10px] font-mono-tabular uppercase tracking-widest opacity-75">
                CHAPTER {stage.stepNumber}
              </div>
              <div className="text-xs font-bold tracking-[0.14em] uppercase mt-1 truncate">
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Educational Chapter Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left 7 Columns: Editorial Narrative, Key Idea, Example & Summary */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#7bd0ff] mb-2">
              STAGE {currentStage.stepNumber} OF 06 · {currentStage.title}
            </div>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f4f2ed] mb-4">
              {currentStage.subtitle}
            </h3>
            <p className="text-base sm:text-lg text-[#f4f2ed]/90 font-light leading-relaxed">
              {currentStage.narrative}
            </p>
          </div>

          {/* Key Idea & Example Architectural Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-white/[0.08]">
            <div className="border-l-2 border-[#ffc174] pl-4">
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] mb-1.5">
                KEY IDEA
              </div>
              <p className="text-sm text-[#f4f2ed] leading-relaxed">
                {currentStage.keyIdea}
              </p>
            </div>

            <div className="border-l-2 border-[#7bd0ff] pl-4">
              <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#7bd0ff] mb-1.5">
                CONCRETE EXAMPLE
              </div>
              <p className="text-sm text-[#b8b0a4] leading-relaxed">
                {currentStage.example}
              </p>
            </div>
          </div>

          {/* Summary & Next Chapter Trigger */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#d0bcff] block mb-1">
                STAGE TAKEAWAY SUMMARY
              </span>
              <p className="font-serif-editorial italic text-lg text-[#f4f2ed]">
                “{currentStage.summary}”
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                handleStageChange(
                  (activeStageIdx + 1) % EDUCATIONAL_AI_STAGES.length
                )
              }
              className="shrink-0 bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Live Synaptic Visualizer & Quick Quiz */}
        <div className="lg:col-span-5 bg-[#050507] border border-white/15 p-6 sm:p-8 space-y-8">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tabular mb-3">
              <span className="text-[#ffc174] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                SYNAPTIC TENSOR SIMULATION
              </span>
              <span className="text-[#7bd0ff]">{sliderVal}% CONVERGENCE</span>
            </div>

            <div className="h-44 w-full bg-[#090a0f] border border-white/[0.07] p-4 flex items-center justify-center mb-4">
              <svg className="w-full h-full" viewBox="0 0 320 120">
                {[25, 60, 95].map((y, i) =>
                  [20, 46, 72, 98].map((y2, j) => (
                    <line
                      key={`l1-${i}-${j}`}
                      x1="47"
                      y1={y}
                      x2="152"
                      y2={y2}
                      stroke="#ffc174"
                      strokeOpacity={Math.max(
                        0.1,
                        (sliderVal / 100) * ((i + j) % 2 === 0 ? 0.8 : 0.28)
                      )}
                      strokeWidth={0.8 + (sliderVal / 100) * 1.4}
                    />
                  ))
                )}
                {[20, 46, 72, 98].map((y1, i) =>
                  [40, 80].map((y2, j) => (
                    <line
                      key={`l2-${i}-${j}`}
                      x1="168"
                      y1={y1}
                      x2="271"
                      y2={y2}
                      stroke="#7bd0ff"
                      strokeOpacity={Math.max(0.15, (sliderVal / 100) * 0.85)}
                      strokeWidth={0.8 + (sliderVal / 100) * 1.6}
                    />
                  ))
                )}
                {[25, 60, 95].map((y, i) => (
                  <circle key={`in-${i}`} cx="40" cy={y} r="6" fill="#ffc174" />
                ))}
                {[20, 46, 72, 98].map((y, i) => (
                  <circle key={`hid-${i}`} cx="160" cy={y} r="7" fill="#7bd0ff" />
                ))}
                {[40, 80].map((y, i) => (
                  <circle key={`out-${i}`} cx="280" cy={y} r="8" fill="#d0bcff" />
                ))}
              </svg>
            </div>

            <label className="block text-xs font-mono-tabular text-[#b8b0a4] mb-2">
              {currentStage.interactiveParameterLabel}:{' '}
              <span className="text-[#f4f2ed] font-semibold">{sliderVal}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full accent-[#ffc174] cursor-pointer"
            />
          </div>

          {/* Quick Quiz */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] mb-2">
              QUICK COMPREHENSION CHECK · STAGE {currentStage.stepNumber}
            </div>
            <p className="font-serif-editorial text-lg text-[#f4f2ed] mb-4 leading-snug">
              {currentStage.quiz.question}
            </p>
            <div className="space-y-2">
              {currentStage.quiz.options.map((option, oIdx) => {
                const picked = stageQuizSelection[currentStage.id];
                const isSelected = picked === oIdx;
                const isRight = oIdx === currentStage.quiz.correctIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setStageQuizSelection({
                        ...stageQuizSelection,
                        [currentStage.id]: oIdx,
                      })
                    }
                    className={`w-full text-left p-3 text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer border ${
                      isSelected
                        ? isRight
                          ? 'bg-[#ffc174]/15 text-[#ffc174] border-[#ffc174]'
                          : 'bg-[#ffb4ab]/15 text-[#ffb4ab] border-[#ffb4ab]'
                        : 'bg-[#090a0f] hover:bg-white/[0.04] text-[#b8b0a4] border-white/10'
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected &&
                      (isRight ? (
                        <CheckCircle2 className="w-4 h-4 text-[#ffc174] shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#ffb4ab] shrink-0" />
                      ))}
                  </button>
                );
              })}
            </div>
            {stageQuizSelection[currentStage.id] !== undefined && (
              <p className="mt-3 text-xs text-[#ffc174] leading-relaxed">
                {currentStage.quiz.explanation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4 Pedagogical Framework Tracks (Clean Hairline Architectural Row) */}
      <div className="pt-10 border-t border-white/[0.1]">
        <div className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4] mb-6">
          RELATED PEDAGOGICAL SIMULATIONS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {curriculumTracks.map((track) => (
            <div
              key={track.num}
              onClick={track.onClick}
              className="group border-t border-white/15 pt-4 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#ffc174] mb-2">
                  <span>TRACK {track.num}</span>
                  <span className="text-[#7bd0ff]">{track.domain}</span>
                </div>
                <h4 className="font-serif-editorial text-2xl text-[#f4f2ed] group-hover:text-[#ffc174] transition-colors mb-2">
                  {track.title}
                </h4>
                <p className="text-xs text-[#b8b0a4] leading-relaxed mb-4">
                  {track.desc}
                </p>
              </div>
              <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#ffc174] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>{track.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
