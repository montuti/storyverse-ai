import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Compass,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
} from 'lucide-react';
import { Story } from '../types/story';
import { BRAND_ASSETS } from '../data/stories';
import { ResilientImage } from './ResilientImage';
import { StoryDNAVisualizer } from './StoryDNAVisualizer';
import { soundEngine } from '../utils/soundEngine';

interface FeaturedStorySpotlightProps {
  story: Story;
  isSaved: boolean;
  onOpenStory: (story: Story) => void;
  onToggleBookmark: (storyTitle: string) => void;
  onOpenVideoExperience: () => void;
  onOpenMapExperience: () => void;
}

export const FeaturedStorySpotlight: React.FC<FeaturedStorySpotlightProps> = ({
  story,
  isSaved,
  onOpenStory,
  onToggleBookmark,
  onOpenVideoExperience,
  onOpenMapExperience,
}) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListen = () => {
    if (isListening) {
      soundEngine.stopAmbientDrone();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsListening(false);
    } else {
      soundEngine.startAmbientDrone(110);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          `${story.title}. ${story.description}`
        );
        utterance.rate = 0.95;
        utterance.pitch = 0.9;
        utterance.onend = () => {
          setIsListening(false);
          soundEngine.stopAmbientDrone();
        };
        window.speechSynthesis.speak(utterance);
      }
      setIsListening(true);
    }
  };

  return (
    <section
      id="featured"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 bg-[#050507] border-t border-white/[0.08]"
    >
      {/* Section Index & Curatorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-8 border-b border-white/[0.08] mb-12">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174]">
            01 / MASTERWORK EXHIBITION
          </span>
          <span className="text-white/20">·</span>
          <span className="text-xs font-mono-tabular uppercase tracking-[0.16em] text-[#b8b0a4]">
            CURATOR&apos;S CHOICE NO. 01
          </span>
        </div>
        <div className="text-xs font-mono-tabular text-[#b8b0a4]">
          SOL-9 ARCHIVE · 6 CHAPTERS · BRANCHING CONSEQUENCE
        </div>
      </div>

      {/* Asymmetric 12-Column Movie-Poster Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left 7 Columns: Monumental Visual Stage */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-cursor="story"
          onClick={() => onOpenStory(story)}
          className="lg:col-span-7 relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden border border-white/15 group cursor-pointer bg-[#090a0f]"
        >
          <ResilientImage
            src={BRAND_ASSETS.spotlightHero}
            alt={story.coverAlt}
            fallbackTitle={story.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/40 to-transparent" />

          {/* Top Unboxed Telemetry Line */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between text-[11px] font-mono-tabular uppercase tracking-[0.18em] text-[#f4f2ed]/90">
            <span>BRANCHING NARRATIVE · SPATIAL 3D AUDIO</span>
            <span className="text-[#ffc174]">42.8K READS</span>
          </div>

          {/* Monumental Stacked Editorial Typography Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="font-serif-editorial text-5xl sm:text-7xl xl:text-[82px] font-normal leading-[0.88] tracking-[-0.03em] text-[#f4f2ed] uppercase select-none">
              THE
              <br />
              <span className="italic text-[#ffc174]">LAST</span>
              <br />
              LIGHT
            </div>

            <div className="pb-1">
              <span className="inline-flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] border-b border-[#ffc174] pb-1 group-hover:translate-x-1 transition-transform">
                <span>Enter Story World</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right 5 Columns: Editorial Dossier, Story DNA Spectrograph & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.16em] text-[#7bd0ff] mb-3">
              <span>{story.subtitle}</span>
              <span className="text-white/25">·</span>
              <span className="text-[#b8b0a4]">{story.durationMinutes} MIN READ</span>
              <span className="text-white/25">·</span>
              <span className="text-[#ffc174]">BY {story.author.name}</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#f4f2ed] font-normal leading-tight mb-4">
              A planetary consciousness compressed into a single dying flame.
            </h2>

            <p className="text-sm sm:text-base text-[#b8b0a4] leading-relaxed font-light mb-6">
              {story.description}
            </p>

            {/* Bespoke Story DNA Spectrograph */}
            <StoryDNAVisualizer dna={story.dna} storyTitle={story.title} />
          </div>

          {/* Action Suite: ENTER EXPERIENCE, LISTEN, WATCH, EXPLORE */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenStory(story)}
                className="col-span-2 bg-[#ffc174] hover:bg-[#ffddb8] text-[#1a0f00] py-3.5 px-5 rounded-xs text-xs font-bold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span>Enter Experience</span>
              </button>

              <button
                type="button"
                onClick={toggleListen}
                className={`py-3.5 px-4 rounded-xs text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-1.5 border cursor-pointer whitespace-nowrap ${
                  isListening
                    ? 'bg-[#7bd0ff] text-[#001e2c] border-[#7bd0ff]'
                    : 'bg-transparent hover:bg-white/[0.05] text-[#7bd0ff] border-white/15'
                }`}
              >
                {isListening ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Playing</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Listen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onOpenVideoExperience}
                className="bg-transparent hover:bg-white/[0.05] text-[#f4f2ed] border border-white/15 py-3.5 px-4 rounded-xs text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 text-[#ffc174]" />
                <span>Watch</span>
              </button>
            </div>

            {/* Secondary Action & Provenance Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#b8b0a4]">
              <button
                type="button"
                onClick={onOpenMapExperience}
                className="hover:text-[#ffc174] transition-colors flex items-center gap-1.5 cursor-pointer font-mono-tabular uppercase tracking-wider"
              >
                <Compass className="w-3.5 h-3.5 text-[#d0bcff]" />
                <span>Explore Sol-9 Cartography →</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleBookmark(story.title)}
                className="hover:text-[#ffc174] transition-colors flex items-center gap-1.5 cursor-pointer font-mono-tabular uppercase tracking-wider"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-[#ffc174]" />
                    <span className="text-[#ffc174]">Archived in Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save to Archive</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
