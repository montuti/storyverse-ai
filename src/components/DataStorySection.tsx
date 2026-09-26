import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TELEMETRY_YEARS_DATA, STORIES } from '../data/stories';
import { Story } from '../types/story';

interface DataStorySectionProps {
  onOpenStory: (story: Story) => void;
}

export const DataStorySection: React.FC<DataStorySectionProps> = ({
  onOpenStory,
}) => {
  const [cycle, setCycle] = useState<'day' | 'night'>('day');
  const [selectedYearIdx, setSelectedYearIdx] = useState<number>(2);

  const currentYearData = TELEMETRY_YEARS_DATA[selectedYearIdx];
  const activeSlice = cycle === 'day' ? currentYearData.day : currentYearData.night;

  const circumference = 238.76;
  const strokeDashoffset =
    circumference - (activeSlice.airPurityPercent / 100) * circumference;

  const openStormStory = () => {
    const storm =
      STORIES.find((s) => s.title === 'The Mathematics of a Storm') ||
      STORIES[0];
    onOpenStory(storm);
  };

  return (
    <section
      id="data-lab"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 bg-[#050507] border-t border-white/[0.08]"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08] mb-12">
        <div className="lg:col-span-7">
          <div className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174] mb-3">
            05 / DATA STORYTELLING · STORYVERSE DEMO METRICS
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#f4f2ed] font-normal tracking-tight leading-none">
            The City That Never{' '}
            <span className="italic text-[#ffc174]">Sleeps.</span>
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-base text-[#b8b0a4] font-light leading-relaxed">
            Shift across decades (2020–2040) and diurnal/nocturnal cycles to observe how energy grids, autonomous transit, population density, and atmospheric purity co-evolve.
          </p>
        </div>
      </div>

      {/* Architectural Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-12">
        <div className="flex flex-wrap items-center gap-8">
          {/* Era Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#b8b0a4]">
              ERA:
            </span>
            <div className="flex items-center border border-white/15">
              {TELEMETRY_YEARS_DATA.map((yr, idx) => (
                <button
                  key={yr.year}
                  type="button"
                  onClick={() => setSelectedYearIdx(idx)}
                  className={`px-4 py-2 text-xs font-mono-tabular transition-colors cursor-pointer ${
                    selectedYearIdx === idx
                      ? 'bg-[#ffc174] text-[#1a0f00] font-bold'
                      : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                  }`}
                >
                  {yr.year}
                </button>
              ))}
            </div>
          </div>

          {/* Temporal Cycle Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#b8b0a4]">
              CYCLE:
            </span>
            <div className="flex items-center border border-white/15">
              <button
                type="button"
                onClick={() => setCycle('day')}
                className={`px-4 py-2 text-xs font-mono-tabular uppercase tracking-wider transition-colors cursor-pointer ${
                  cycle === 'day'
                    ? 'bg-[#7bd0ff] text-[#001e2c] font-bold'
                    : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
              >
                08:00 Diurnal
              </button>
              <button
                type="button"
                onClick={() => setCycle('night')}
                className={`px-4 py-2 text-xs font-mono-tabular uppercase tracking-wider transition-colors cursor-pointer ${
                  cycle === 'night'
                    ? 'bg-[#d0bcff] text-[#23005c] font-bold'
                    : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
              >
                02:00 Nocturnal
              </button>
            </div>
          </div>
        </div>

        {/* Narrative Annotation */}
        <div className="text-xs font-mono-tabular text-[#ffc174]">
          {currentYearData.label} · SIMULATED DEMO DATASET
        </div>
      </div>

      {/* Main Data Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left 8 Columns: Animated Comparative Bar Matrix + Narrative Commentary */}
        <div className="lg:col-span-8 space-y-8">
          <div className="border-l-2 border-[#ffc174] pl-5 py-1">
            <p className="font-serif-editorial italic text-xl text-[#f4f2ed] leading-relaxed">
              “{currentYearData.narrative}”
            </p>
          </div>

          <div className="bg-[#090a0f] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-wider text-[#b8b0a4] mb-8">
              <span>
                {cycle === 'day'
                  ? 'DIURNAL RESOURCE CONSUMPTION & TRANSIT FLUX'
                  : 'NOCTURNAL NEURAL BANDWIDTH & GRID BASELINE'}
              </span>
              <span className="text-[#ffc174]">UNIT: GIGAWATTS / MILLIONS</span>
            </div>

            {/* Animated Bars */}
            <div className="w-full h-64 relative flex items-end justify-around pb-8 pt-6 border-b border-white/10">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 py-6">
                <div className="w-full border-t border-white" />
                <div className="w-full border-t border-white" />
                <div className="w-full border-t border-white" />
                <div className="w-full border-t border-white" />
              </div>

              {activeSlice.cities.map((city, i) => {
                const barColor =
                  i === 0
                    ? '#ffc174'
                    : i === 1
                    ? '#7bd0ff'
                    : i === 2
                    ? '#d0bcff'
                    : '#f59e0b';

                return (
                  <div
                    key={city.name}
                    className="flex flex-col items-center gap-2.5 z-10 w-16 sm:w-24"
                  >
                    <span className="text-xs font-mono-tabular text-[#f4f2ed] font-semibold">
                      {city.energyGW} GW
                    </span>
                    <div
                      className="w-full transition-all duration-700"
                      style={{
                        height: `${city.energyGW}px`,
                        backgroundColor: barColor,
                        boxShadow: `0 0 24px ${barColor}33`,
                      }}
                    />
                    <span className="font-serif-editorial text-lg text-[#f4f2ed] mt-1">
                      {city.name}
                    </span>
                    <div className="text-[10px] font-mono-tabular text-[#b8b0a4] text-center">
                      <div>{city.transitM}M transit</div>
                      <div className="text-[#7bd0ff]">
                        AQI {city.pollutionIndex}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Atmospheric Purity & Ledger Breakdown */}
        <div className="lg:col-span-4 bg-[#090a0f] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] pb-3 border-b border-white/10 mb-6">
              ATMOS PURITY &amp; GRID LEDGER
            </div>

            <div className="relative flex items-center justify-center my-6">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#1a1d28"
                  strokeWidth="6"
                />
                <circle
                  className="transition-all duration-700"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="38"
                  stroke="#ffc174"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="butt"
                  strokeWidth="6"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-serif-editorial text-4xl text-[#f4f2ed] font-mono-tabular">
                  {activeSlice.airPurityPercent}%
                </span>
                <span className="block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] mt-1">
                  AIR PURITY
                </span>
              </div>
            </div>

            <dl className="divide-y divide-white/[0.08] text-xs font-mono-tabular">
              <div className="py-3 flex justify-between">
                <dt className="text-[#b8b0a4]">POWER GRID LOAD</dt>
                <dd className="text-[#f4f2ed] font-semibold">
                  {activeSlice.gridLoadGW}
                </dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-[#b8b0a4]">AUTONOMOUS TRANSIT</dt>
                <dd className="text-[#7bd0ff] font-semibold">
                  {activeSlice.transitUnits}
                </dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-[#b8b0a4]">NEURAL BANDWIDTH</dt>
                <dd className="text-[#d0bcff] font-semibold">
                  {activeSlice.neuralBandwidth}
                </dd>
              </div>
            </dl>
          </div>

          <button
            type="button"
            onClick={openStormStory}
            className="w-full py-3.5 px-4 border border-[#ffc174]/50 hover:bg-[#ffc174] text-[#ffc174] hover:text-[#1a0f00] text-xs font-mono-tabular font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter Full Data Story</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
