import React, { useState } from 'react';
import { StoryDNA } from '../types/story';

interface StoryDNAVisualizerProps {
  dna: StoryDNA;
  storyTitle?: string;
  mood?: string;
  compact?: boolean;
}

export const StoryDNAVisualizer: React.FC<StoryDNAVisualizerProps> = ({
  dna,
  mood = 'Mysterious',
  compact = false,
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  const axes = [
    { key: 'emotion', label: 'EMOTION', code: 'EMO', val: dna.emotion, color: '#ffc174' },
    { key: 'mystery', label: 'MYSTERY', code: 'MYS', val: dna.mystery, color: '#7bd0ff' },
    { key: 'learning', label: 'LEARNING', code: 'LRN', val: dna.learning, color: '#d0bcff' },
    { key: 'visual', label: 'VISUAL', code: 'VIS', val: dna.visual, color: '#f59e0b' },
    { key: 'interaction', label: 'AGENCY', code: 'INT', val: dna.interaction, color: '#38bdf8' },
    { key: 'audio', label: 'ACOUSTIC', code: 'AUD', val: dna.audio, color: '#c084fc' },
    { key: 'depth', label: 'DEPTH', code: 'DPT', val: dna.depth, color: '#fde68a' },
  ];

  if (compact) {
    return (
      <div
        className="flex items-end gap-1 h-7"
        aria-label="Story DNA Spectrograph"
        title="7-Axis Story DNA Fingerprint"
      >
        {axes.map((axis) => (
          <div key={axis.key} className="flex flex-col items-center gap-0.5">
            <div className="w-1.5 h-5 bg-white/[0.07] flex items-end overflow-hidden">
              <div
                style={{
                  height: `${axis.val}%`,
                  backgroundColor: axis.color,
                }}
                className="w-full transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const size = 164;
  const center = size / 2;
  const maxRadius = 60;

  const points = axes
    .map((axis, i) => {
      const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
      const r = (axis.val / 100) * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="border-y border-white/10 py-5 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#ffc174]" />
          <span className="text-[11px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
            STORY DNA // VISUAL FINGERPRINT
          </span>
        </div>
        <span className="text-[11px] font-mono-tabular text-[#b8b0a4]">
          {hoveredAxis || '7-AXIS HARMONIC PROFILE'}
        </span>
      </div>

      {/* Section 16: Semantic Story DNA Indicators (MOOD, PACE, EMOTION, FORMAT, TOPICS) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pb-4 border-b border-white/[0.08]">
        <div className="bg-[#050507] border border-white/10 p-2.5">
          <div className="text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
            MOOD
          </div>
          <div className="text-xs font-semibold text-[#ffc174] mt-0.5">
            {mood}
          </div>
        </div>
        <div className="bg-[#050507] border border-white/10 p-2.5">
          <div className="text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
            PACE
          </div>
          <div className="text-xs font-semibold text-[#7bd0ff] mt-0.5">
            {dna.pace || 'Slow → Fast'}
          </div>
        </div>
        <div className="bg-[#050507] border border-white/10 p-2.5">
          <div className="text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
            EMOTION
          </div>
          <div className="text-xs font-semibold text-[#d0bcff] mt-0.5 truncate">
            {dna.primaryEmotion || 'Curiosity'}
          </div>
        </div>
        <div className="bg-[#050507] border border-white/10 p-2.5">
          <div className="text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
            FORMAT
          </div>
          <div className="text-xs font-semibold text-[#f4f2ed] mt-0.5 truncate">
            {dna.formatSummary || 'Cinema + Voice + Text'}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-[#050507] border border-white/10 p-2.5">
          <div className="text-[9px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
            TOPICS
          </div>
          <div className="text-xs font-semibold text-[#ffc174] mt-0.5 truncate">
            {(dna.topics || ['AI', 'Future', 'Humanity']).join(' / ')}
          </div>
        </div>
      </div>

      {/* 7-Axis Radar + Spectrographic Waveform */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        <div className="sm:col-span-5 flex justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
            role="img"
            aria-label="Story DNA 7-axis radar geometry"
          >
            {[0.35, 0.7, 1].map((scale) => (
              <circle
                key={scale}
                cx={center}
                cy={center}
                r={maxRadius * scale}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray={scale === 1 ? 'none' : '2 2'}
              />
            ))}

            {axes.map((axis, i) => {
              const angle = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
              const x2 = center + maxRadius * Math.cos(angle);
              const y2 = center + maxRadius * Math.sin(angle);
              const lx = center + (maxRadius + 15) * Math.cos(angle);
              const ly = center + (maxRadius + 15) * Math.sin(angle);
              return (
                <g key={axis.key}>
                  <line
                    x1={center}
                    y1={center}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-[#b8b0a4] text-[8px] font-mono-tabular"
                  >
                    {axis.code}
                  </text>
                </g>
              );
            })}

            <polygon
              points={points}
              fill="rgba(255, 193, 116, 0.16)"
              stroke="#ffc174"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="sm:col-span-7 space-y-2">
          {axes.map((axis) => (
            <div
              key={axis.key}
              onMouseEnter={() => setHoveredAxis(`${axis.label}: ${axis.val}%`)}
              onMouseLeave={() => setHoveredAxis(null)}
              className="group flex items-center gap-3 text-xs cursor-default"
            >
              <span className="w-20 font-mono-tabular text-[10px] tracking-wider text-[#b8b0a4] group-hover:text-[#f4f2ed] transition-colors">
                {axis.label}
              </span>
              <div className="flex-1 h-1.5 bg-white/[0.06] relative overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${axis.val}%`,
                    backgroundColor: axis.color,
                  }}
                />
              </div>
              <span className="w-9 text-right font-mono-tabular text-[11px] text-[#f4f2ed]">
                {axis.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
