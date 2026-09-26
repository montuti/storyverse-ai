import React, { useState } from 'react';
import {
  Play,
  ArrowUpRight,
  Bookmark,
  Clock,
  Flame,
  History,
  Palette,
} from 'lucide-react';
import { Story, UserJourneyState } from '../types/story';
import { ResilientImage } from './ResilientImage';

interface TrendingAndLibrarySectionProps {
  stories: Story[];
  journey: UserJourneyState;
  onOpenStory: (story: Story) => void;
  onToggleBookmark: (title: string) => void;
}

export const TrendingAndLibrarySection: React.FC<
  TrendingAndLibrarySectionProps
> = ({ stories, journey, onOpenStory, onToggleBookmark }) => {
  const [libraryTab, setLibraryTab] = useState<
    'continue' | 'saved' | 'recent'
  >('continue');

  const trendingStories = stories.filter((s) => s.isTrending).slice(0, 6);

  const continueWatchingStories = stories.filter(
    (s) =>
      journey.watchProgress?.[s.title] ||
      journey.storiesOpened.includes(s.title)
  );

  const savedStoryObjects = stories.filter((s) =>
    journey.savedStories.includes(s.title)
  );

  const recentStoryObjects = journey.storiesOpened
    .map((title) => stories.find((s) => s.title === title))
    .filter((s): s is Story => Boolean(s));

  const activeLibraryList =
    libraryTab === 'continue'
      ? continueWatchingStories
      : libraryTab === 'saved'
      ? savedStoryObjects
      : recentStoryObjects;

  return (
    <section
      id="trending"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-20 lg:py-28 bg-[#050507] border-t border-white/[0.08] space-y-20"
    >
      {/* PART 1: TRENDING NOW (Only visible after authentication) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/[0.08] mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174] mb-2">
              <Flame className="w-4 h-4" />
              <span>TRENDING NOW · AUTHENTICATED STREAM</span>
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl text-[#f4f2ed] font-normal tracking-tight">
              Worlds in <span className="italic text-[#ffc174]">motion.</span>
            </h2>
          </div>
          <div className="text-xs font-mono-tabular text-[#b8b0a4]">
            FICTIONAL DEMO TRENDING METRICS · SYNCHRONIZED VIDEO + VOICE
          </div>
        </div>

        {/* Horizontal Cinematic Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {trendingStories.map((story, idx) => {
            const isSaved = journey.savedStories.includes(story.title);
            return (
              <article
                key={story.id}
                data-cursor="story"
                onClick={() => onOpenStory(story)}
                className="group relative bg-[#090a0f] border border-white/15 hover:border-[#ffc174]/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.18)] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* Horizontal Cinematic Visual */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050507]">
                  <ResilientImage
                    src={story.coverUrl}
                    alt={story.coverAlt}
                    fallbackTitle={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/30 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-widest">
                    <span className="bg-[#050507]/85 backdrop-blur-md border border-[#ffc174]/40 text-[#ffc174] px-2.5 py-1">
                      TRENDING #{idx + 1} · {(story.metrics.views / 1000).toFixed(1)}K DEMO VIEWS
                    </span>
                    {story.supportsCartoonMode && (
                      <span className="bg-[#050507]/85 backdrop-blur-md border border-[#d0bcff]/40 text-[#d0bcff] px-2 py-1 flex items-center gap-1">
                        <Palette className="w-3 h-3" /> ILLUSTRATED
                      </span>
                    )}
                  </div>

                  {/* Hover "ENTER STORY" Button */}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-[#ffc174] text-[#1a0f00] px-3.5 py-1.5 text-[10px] font-mono-tabular font-bold uppercase tracking-widest flex items-center gap-1 transform group-hover:-translate-y-0.5 transition-transform">
                      <Play className="w-3 h-3 fill-current" />
                      <span>ENTER STORY</span>
                    </span>
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono-tabular uppercase tracking-wider text-[#7bd0ff] mb-1">
                      <span>{story.category}</span>
                      <span>·</span>
                      <span>{story.format}</span>
                      <span>·</span>
                      <span>{story.durationMinutes} MIN</span>
                      <span>·</span>
                      <span className="text-[#d0bcff]">{story.mood}</span>
                    </div>
                    <h3 className="font-serif-editorial text-2xl text-[#f4f2ed] group-hover:text-[#ffc174] group-hover:translate-x-1 transition-all">
                      {story.title}
                    </h3>
                    <p className="text-xs text-[#b8b0a4] line-clamp-2 mt-1.5 leading-relaxed">
                      {story.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono-tabular text-[#b8b0a4]">
                    <span>By {story.author.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(story.title);
                      }}
                      className={`flex items-center gap-1 cursor-pointer ${
                        isSaved ? 'text-[#ffc174]' : 'hover:text-[#f4f2ed]'
                      }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isSaved ? 'fill-[#ffc174]' : ''
                        }`}
                      />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* PART 2: MY STORY LIBRARY (Continue Watching, Saved Stories, Recently Viewed) */}
      <div id="my-library" className="pt-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#7bd0ff] mb-2">
              PERSONAL ARCHIVE // LOCALSTORAGE SYNCED
            </div>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#f4f2ed]">
              My Story Library
            </h3>
          </div>

          <div className="flex items-center border border-white/15 bg-[#090a0f]">
            {[
              {
                id: 'continue' as const,
                label: `Continue Watching (${continueWatchingStories.length})`,
                icon: Clock,
              },
              {
                id: 'saved' as const,
                label: `Saved Stories (${savedStoryObjects.length})`,
                icon: Bookmark,
              },
              {
                id: 'recent' as const,
                label: `Recently Viewed (${recentStoryObjects.length})`,
                icon: History,
              },
            ].map((t) => {
              const Icon = t.icon;
              const active = libraryTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLibraryTab(t.id)}
                  className={`px-4 py-2.5 text-xs font-mono-tabular uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#ffc174] text-[#1a0f00] font-bold'
                      : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeLibraryList.length === 0 ? (
          <div className="border border-white/10 bg-[#090a0f] p-10 text-center">
            <p className="text-sm text-[#b8b0a4]">
              No stories in this shelf yet. Select any world to begin your synchronized cinema experience.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeLibraryList.slice(0, 4).map((story) => {
              const progress = journey.watchProgress?.[story.title];
              return (
                <div
                  key={story.id}
                  onClick={() => onOpenStory(story)}
                  className="bg-[#090a0f] border border-white/15 hover:border-[#ffc174] p-4 flex flex-col justify-between gap-4 group cursor-pointer transition-colors"
                >
                  <div>
                    <div className="relative h-32 w-full overflow-hidden mb-3 bg-[#050507]">
                      <ResilientImage
                        src={story.coverUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/15">
                        <div
                          className="h-full bg-[#ffc174]"
                          style={{
                            width: progress
                              ? `${Math.min(100, ((progress.sceneIndex + 1) / 5) * 100)}%`
                              : '25%',
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#ffc174]">
                      {progress
                        ? `SCENE 0${progress.sceneIndex + 1} · ${progress.currentTime}S`
                        : `${story.category} · ${story.durationMinutes}M`}
                    </div>
                    <h4 className="font-serif-editorial text-xl text-[#f4f2ed] group-hover:text-[#ffc174] mt-0.5 truncate">
                      {story.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono-tabular uppercase text-[#7bd0ff] pt-2 border-t border-white/[0.07]">
                    <span>Resume Player</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
