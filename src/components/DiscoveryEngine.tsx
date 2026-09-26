import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Bookmark,
  Heart,
  ArrowUpRight,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Play,
  Palette,
} from 'lucide-react';
import { Story } from '../types/story';
import { EXPLORE_TOPICS } from '../data/stories';
import { ResilientImage } from './ResilientImage';
import { StoryDNAVisualizer } from './StoryDNAVisualizer';

interface DiscoveryEngineProps {
  stories: Story[];
  savedStories: string[];
  likedStories: string[];
  externalFormatFilter?: string | null;
  onOpenStory: (story: Story) => void;
  onToggleBookmark: (title: string) => void;
  onToggleLike: (title: string) => void;
}

export const DiscoveryEngine: React.FC<DiscoveryEngineProps> = ({
  stories,
  savedStories,
  likedStories,
  externalFormatFilter,
  onOpenStory,
  onToggleBookmark,
  onToggleLike,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shelfFilter, setShelfFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [moodFilter, setMoodFilter] = useState<string>('All');
  const [sortSignal, setSortSignal] = useState<string>('trending');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'editorial' | 'ledger'>('editorial');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    if (externalFormatFilter) {
      if (externalFormatFilter === 'All') {
        setShelfFilter('ALL');
      } else if (externalFormatFilter === 'Cinematic Video') {
        setShelfFilter('CINEMATIC');
      } else if (externalFormatFilter === 'Audio Drama') {
        setShelfFilter('AUDIO');
      }
    }
  }, [externalFormatFilter]);

  // Section 13 & 20: Story Library Shelves & Filter Modes
  const libraryShelves = [
    { id: 'ALL', label: 'All Worlds' },
    { id: 'TRENDING', label: 'Trending' },
    { id: 'NEW', label: 'New Stories' },
    { id: 'CINEMATIC', label: 'Video & Cinema' },
    { id: 'AUDIO', label: 'Audio' },
    { id: 'INTERACTIVE', label: 'Interactive' },
    { id: '3D', label: '3D Visual' },
    { id: 'EDUCATIONAL', label: 'Educational' },
    { id: 'AI', label: 'AI Stories' },
    { id: 'DATA', label: 'Data Stories' },
    { id: 'ILLUSTRATED', label: 'Illustrated / Cartoon' },
  ];

  // Section 3: Full Category Spectrum
  const categories = [
    'All',
    'Science',
    'Space',
    'Technology',
    'AI',
    'Environment',
    'Future',
    'Mystery',
    'History',
    'Education',
    'Human Stories',
    'Innovation',
    'Biography',
    'Philosophy',
  ];

  const filteredStories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = stories.filter((story) => {
      const matchesQuery =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.description.toLowerCase().includes(q) ||
        story.author.name.toLowerCase().includes(q) ||
        story.mood.toLowerCase().includes(q) ||
        story.format.toLowerCase().includes(q) ||
        story.tags.some((t) => t.toLowerCase().includes(q)) ||
        story.category.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === 'All' || story.category === categoryFilter;
      const matchesMood = moodFilter === 'All' || story.mood === moodFilter;

      let matchesShelf = true;
      if (shelfFilter === 'TRENDING') matchesShelf = Boolean(story.isTrending);
      else if (shelfFilter === 'NEW') matchesShelf = Boolean(story.isNew);
      else if (shelfFilter === 'CINEMATIC')
        matchesShelf =
          story.format === 'Cinematic Video' || story.format === 'Photo Essay';
      else if (shelfFilter === 'AUDIO')
        matchesShelf = story.format === 'Audio Drama';
      else if (shelfFilter === 'INTERACTIVE')
        matchesShelf = story.format === 'Interactive';
      else if (shelfFilter === '3D') matchesShelf = story.format === '3D Visual';
      else if (shelfFilter === 'EDUCATIONAL')
        matchesShelf =
          story.category === 'Education' || story.category === 'Science';
      else if (shelfFilter === 'AI')
        matchesShelf =
          story.format === 'AI Lab' ||
          story.tags.some((t) => t.toLowerCase().includes('ai'));
      else if (shelfFilter === 'DATA')
        matchesShelf = story.format === 'Data Story';
      else if (shelfFilter === 'ILLUSTRATED')
        matchesShelf =
          story.format === 'Illustrated' || Boolean(story.supportsCartoonMode);

      return matchesQuery && matchesCategory && matchesMood && matchesShelf;
    });

    const sorted = [...list];
    if (sortSignal === 'views') {
      sorted.sort((a, b) => b.metrics.views - a.metrics.views);
    } else if (sortSignal === 'saves') {
      sorted.sort((a, b) => b.metrics.saves - a.metrics.saves);
    } else if (sortSignal === 'duration') {
      sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else {
      sorted.sort(
        (a, b) =>
          b.metrics.engagementScore * b.metrics.views -
          a.metrics.engagementScore * a.metrics.views
      );
    }

    return sorted;
  }, [
    stories,
    searchQuery,
    shelfFilter,
    categoryFilter,
    moodFilter,
    sortSignal,
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setShelfFilter('ALL');
    setCategoryFilter('All');
    setMoodFilter('All');
    setSortSignal('trending');
    setActiveTopic(null);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    shelfFilter !== 'ALL' ||
    categoryFilter !== 'All' ||
    moodFilter !== 'All';

  const handleTopicClick = (topic: (typeof EXPLORE_TOPICS)[0]) => {
    if (activeTopic === topic.id) {
      setActiveTopic(null);
      setSearchQuery('');
    } else {
      setActiveTopic(topic.id);
      setSearchQuery(topic.query);
    }
  };

  return (
    <section
      id="discover"
      className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-16 py-24 lg:py-32 bg-[#090a0f] border-t border-white/[0.08]"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-white/[0.08] mb-10">
        <div className="lg:col-span-7">
          <div className="text-xs font-mono-tabular uppercase tracking-[0.22em] text-[#ffc174] mb-3">
            02 / STORY LIBRARY &amp; DISCOVERY ENGINE
          </div>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#f4f2ed] font-normal tracking-tight leading-none">
            Find your next <span className="italic text-[#ffc174]">world.</span>
          </h2>
        </div>

        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-end justify-between gap-4">
          <p className="text-sm text-[#b8b0a4] max-w-md font-light">
            {stories.length} synchronized multimedia stories with video timelines, live voice narration, scene transitions, and Story DNA.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono-tabular">
            <span className="text-[#ffc174]">
              SHOWING {filteredStories.length} OF {stories.length} WORLDS
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[#b8b0a4] hover:text-[#f4f2ed] underline uppercase tracking-wider cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 13 & 20: Story Library Shelves (All, Trending, New, Video, Audio, Interactive, 3D, Educational, AI, Data, Illustrated) */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/[0.07]">
        {libraryShelves.map((shelf) => {
          const active = shelfFilter === shelf.id;
          return (
            <button
              key={shelf.id}
              type="button"
              onClick={() => setShelfFilter(shelf.id)}
              className={`px-4 py-2 text-xs font-mono-tabular uppercase tracking-[0.15em] transition-all shrink-0 cursor-pointer border ${
                active
                  ? 'bg-[#ffc174] text-[#1a0f00] border-[#ffc174] font-bold'
                  : 'bg-[#050507] hover:bg-[#11131a] text-[#b8b0a4] hover:text-[#f4f2ed] border-white/10'
              }`}
            >
              {shelf.label}
            </button>
          );
        })}
      </div>

      {/* Live-Looking Topic Explorer Ribbon */}
      <div className="mb-8 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#7bd0ff] mr-2 shrink-0">
            TOPICS:
          </span>
          {EXPLORE_TOPICS.map((topic) => {
            const isSelected = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicClick(topic)}
                className={`px-3 py-1.5 text-xs font-mono-tabular transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#7bd0ff] text-[#001e2c] border-[#7bd0ff] font-bold'
                    : 'bg-[#11131a] hover:bg-white/[0.08] text-[#f4f2ed] border-white/[0.07]'
                }`}
              >
                <span>{topic.label}</span>
                <span className="text-[10px] opacity-75">{topic.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Architectural Search & Category Bar */}
      <div className="space-y-6 mb-14">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md border-b border-white/20 focus-within:border-[#ffc174] pb-2 flex items-center gap-3">
            <Search className="w-4 h-4 text-[#ffc174] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, topic, mood, format..."
              className="w-full bg-transparent text-sm text-[#f4f2ed] placeholder:text-[#b8b0a4]/60 focus:outline-none"
              aria-label="Search stories"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Domain Category Tabs */}
          <div
            className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar"
            role="tablist"
            aria-label="Story Categories"
          >
            {categories.map((cat) => {
              const isActive = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-2 text-xs uppercase tracking-[0.14em] transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#ffc174] text-[#ffc174] font-semibold bg-white/[0.03]'
                      : 'border-transparent text-[#b8b0a4] hover:text-[#f4f2ed]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filter Drawer Toggle & View Switcher */}
          <div className="flex items-center gap-3 self-end xl:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3.5 py-2 text-xs font-mono-tabular uppercase tracking-wider border transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                showAdvancedFilters
                  ? 'border-[#ffc174] text-[#ffc174] bg-[#ffc174]/10'
                  : 'border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mood &amp; Sort</span>
            </button>

            <div className="flex items-center border border-white/15">
              <button
                type="button"
                onClick={() => setViewMode('editorial')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'editorial'
                    ? 'bg-[#ffc174] text-[#1a0f00]'
                    : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
                title="Editorial Broadsheet View"
                aria-label="Editorial Broadsheet View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('ledger')}
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'ledger'
                    ? 'bg-[#ffc174] text-[#1a0f00]'
                    : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                }`}
                title="Archival Index View"
                aria-label="Archival Index View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Secondary Filter Matrix */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 border-t border-white/[0.07] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4] mb-1.5">
                    Story Mood
                  </label>
                  <select
                    value={moodFilter}
                    onChange={(e) => setMoodFilter(e.target.value)}
                    className="w-full bg-[#11131a] border border-white/15 text-[#f4f2ed] text-xs p-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Moods</option>
                    <option value="Mysterious">Mysterious</option>
                    <option value="Futuristic">Futuristic</option>
                    <option value="Emotional">Emotional</option>
                    <option value="Curious">Curious</option>
                    <option value="Inspiring">Inspiring</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-tabular uppercase tracking-widest text-[#ffc174] mb-1.5">
                    Sort Order
                  </label>
                  <select
                    value={sortSignal}
                    onChange={(e) => setSortSignal(e.target.value)}
                    className="w-full bg-[#11131a] border border-[#ffc174]/40 text-[#f4f2ed] text-xs p-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="trending">Trending Demo Score</option>
                    <option value="views">Most Read &amp; Watched</option>
                    <option value="saves">Most Saved</option>
                    <option value="duration">Shortest First</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredStories.length === 0 ? (
        <div className="border border-white/10 bg-[#050507] p-16 text-center max-w-2xl mx-auto my-8">
          <div className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174] mb-3">
            ZERO TRANSMISSIONS MATCHED
          </div>
          <h3 className="font-serif-editorial text-3xl text-[#f4f2ed] mb-3">
            No stories matched your search or filter selection.
          </h3>
          <p className="text-sm text-[#b8b0a4] mb-8 leading-relaxed">
            Reset the filter matrix to explore all {stories.length} synchronized worlds.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="bg-[#ffc174] text-[#1a0f00] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
          >
            Restore Full Library ({stories.length} Worlds)
          </button>
        </div>
      ) : viewMode === 'ledger' ? (
        /* ARCHIVAL LEDGER INDEX */
        <div className="border-t border-white/[0.12]">
          {filteredStories.map((story, idx) => {
            const isSaved = savedStories.includes(story.title);
            return (
              <motion.div
                layout
                key={story.id}
                onClick={() => onOpenStory(story)}
                className="group border-b border-white/[0.08] py-6 px-3 hover:bg-white/[0.02] transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer"
              >
                <div className="md:col-span-1 text-xs font-mono-tabular text-[#b8b0a4]">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-4">
                  <h4 className="font-serif-editorial text-2xl text-[#f4f2ed] group-hover:text-[#ffc174] transition-colors">
                    {story.title}
                  </h4>
                  <div className="text-xs text-[#b8b0a4] mt-0.5">
                    By {story.author.name} · Mood: {story.mood}
                  </div>
                </div>
                <div className="md:col-span-3 text-xs font-mono-tabular uppercase tracking-wider text-[#7bd0ff]">
                  {story.category} · {story.format} · {story.durationMinutes}m
                </div>
                <div className="md:col-span-2 hidden md:flex items-center gap-3">
                  <StoryDNAVisualizer dna={story.dna} compact />
                </div>
                <div className="md:col-span-2 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(story.title);
                    }}
                    className={`p-2 transition-colors cursor-pointer ${
                      isSaved ? 'text-[#ffc174]' : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                    }`}
                    aria-label={`Bookmark ${story.title}`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                  <span className="text-xs font-mono-tabular uppercase tracking-widest text-[#ffc174] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>ENTER STORY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* ASYMMETRIC EDITORIAL BROADSHEET FOLIO LAYOUT */
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-10">
          {filteredStories.map((story, idx) => {
            const isSaved = savedStories.includes(story.title);
            const isLiked = likedStories.includes(story.title);
            const likeCount = story.metrics.likes + (isLiked ? 1 : 0);

            const patternMod = idx % 7;
            let colSpanClass = 'md:col-span-4';
            let aspectClass = 'aspect-[16/10]';

            if (patternMod === 0) {
              colSpanClass = 'md:col-span-7';
              aspectClass = 'aspect-[16/9]';
            } else if (patternMod === 1) {
              colSpanClass = 'md:col-span-5';
              aspectClass = 'aspect-[4/3]';
            } else if (patternMod === 5 || patternMod === 6) {
              colSpanClass = 'md:col-span-6';
              aspectClass = 'aspect-[16/9]';
            }

            return (
              <motion.article
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                key={story.id}
                data-cursor="story"
                className={`${colSpanClass} group flex flex-col justify-between border-t border-white/[0.12] pt-5`}
              >
                <div>
                  {/* Top Editorial Metadata Line: Category, Format, Mood, Duration */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] font-mono-tabular uppercase tracking-[0.15em] text-[#b8b0a4] mb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#ffc174] font-semibold">
                        NO. {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>·</span>
                      <span className="text-[#7bd0ff]">{story.category}</span>
                      <span>·</span>
                      <span>{story.format}</span>
                      <span>·</span>
                      <span className="text-[#d0bcff]">{story.mood}</span>
                    </div>
                    <span>{story.durationMinutes} MIN</span>
                  </div>

                  {/* Framed Artwork Plate with Hover Zoom, Glow & "ENTER STORY" Button */}
                  <div
                    onClick={() => onOpenStory(story)}
                    className={`relative ${aspectClass} w-full overflow-hidden bg-[#050507] mb-5 cursor-pointer border border-white/[0.1] group-hover:border-[#ffc174]/70 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all duration-500`}
                  >
                    <ResilientImage
                      src={story.coverUrl}
                      alt={story.coverAlt}
                      fallbackTitle={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {story.supportsCartoonMode && (
                      <div className="absolute top-3 left-3 bg-[#050507]/85 backdrop-blur-md border border-[#d0bcff]/40 px-2.5 py-1 text-[10px] font-mono-tabular uppercase tracking-wider text-[#d0bcff] flex items-center gap-1">
                        <Palette className="w-3 h-3" />
                        <span>ILLUSTRATED MODE READY</span>
                      </div>
                    )}

                    {/* Bottom Bar with "ENTER STORY" Button & Story DNA */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-[#ffc174] text-[#1a0f00] px-3.5 py-1.5 text-[10px] font-mono-tabular font-bold uppercase tracking-[0.18em] flex items-center gap-1.5 transform group-hover:translate-x-1 transition-transform">
                        <Play className="w-3 h-3 fill-current" />
                        <span>ENTER STORY</span>
                      </span>

                      <StoryDNAVisualizer dna={story.dna} compact />
                    </div>
                  </div>

                  {/* Editorial Headline with Hover Movement & Deck */}
                  <h3
                    onClick={() => onOpenStory(story)}
                    className={`font-serif-editorial text-[#f4f2ed] group-hover:text-[#ffc174] group-hover:translate-x-1 transition-all cursor-pointer leading-[1.12] mb-2.5 ${
                      patternMod === 0 || patternMod === 5 || patternMod === 6
                        ? 'text-3xl lg:text-4xl'
                        : 'text-2xl lg:text-3xl'
                    }`}
                  >
                    {story.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#b8b0a4] font-light leading-relaxed mb-5 line-clamp-3">
                    {story.description}
                  </p>
                </div>

                {/* Unboxed Editorial Bylines & Actions */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-tabular text-[#b8b0a4]">
                  <div className="flex items-center gap-3">
                    <span className="text-[#f4f2ed]/90">By {story.author.name}</span>
                    <span>·</span>
                    <span>{story.scenes?.length || 5} Scenes</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onToggleLike(story.title)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        isLiked ? 'text-[#ffb4ab]' : 'hover:text-[#f4f2ed]'
                      }`}
                      aria-label={`Like ${story.title}`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? 'fill-[#ffb4ab] text-[#ffb4ab]' : ''
                        }`}
                      />
                      <span>{likeCount.toLocaleString()}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(story.title)}
                      className={`flex items-center gap-1 transition-colors cursor-pointer ${
                        isSaved ? 'text-[#ffc174]' : 'hover:text-[#f4f2ed]'
                      }`}
                      aria-label={`Save ${story.title}`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isSaved ? 'fill-[#ffc174] text-[#ffc174]' : ''
                        }`}
                      />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </section>
  );
};
