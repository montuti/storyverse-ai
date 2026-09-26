import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Story } from '../types/story';

interface CommandSearchModalProps {
  isOpen: boolean;
  stories: Story[];
  onClose: () => void;
  onSelectStory: (story: Story) => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({
  isOpen,
  stories,
  onClose,
  onSelectStory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const results = stories.filter(
    (s) =>
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.format.toLowerCase().includes(q) ||
      s.author.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
  );

  const suggestedSearches = [
    'The Last Light',
    'Quantum',
    'Mars',
    '3D Visual',
    'Philosophy',
    'Silence',
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050507]/90 backdrop-blur-2xl flex items-start justify-center pt-20 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Storyverse"
    >
      <div
        className="w-full max-w-2xl bg-[#090a0f] border border-[#ffc174]/40 shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Search Input Row */}
        <div className="flex items-center gap-3 px-6 py-4 bg-[#050507] border-b border-white/10">
          <Search className="w-4 h-4 text-[#ffc174]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Storyverse archive by title, domain, medium, or author..."
            className="w-full bg-transparent text-[#f4f2ed] placeholder:text-[#b8b0a4]/60 text-sm sm:text-base focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[10px] font-mono-tabular text-[#b8b0a4] border border-white/15 px-2 py-1 hover:text-[#f4f2ed] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="px-6 py-3 bg-[#090a0f] flex flex-wrap items-center gap-2 border-b border-white/[0.07]">
          <span className="text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] mr-1">
            INDEX KEYS:
          </span>
          {suggestedSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item)}
              className="text-[11px] font-mono-tabular bg-[#11131a] hover:bg-white/[0.08] text-[#b8b0a4] hover:text-[#ffc174] px-2.5 py-1 border border-white/[0.07] transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-white/[0.07]">
          {results.length === 0 ? (
            <div className="p-10 text-center text-sm text-[#b8b0a4]">
              No matching transmissions found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className="w-full px-6 py-4 text-left hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10px] font-mono-tabular uppercase tracking-wider text-[#7bd0ff]">
                    <span className="text-[#ffc174]">
                      0{idx + 1}
                    </span>
                    <span>·</span>
                    <span>{story.category}</span>
                    <span>·</span>
                    <span>{story.format}</span>
                    <span>·</span>
                    <span>{story.durationMinutes} MIN</span>
                  </div>
                  <div className="font-serif-editorial text-xl text-[#f4f2ed] group-hover:text-[#ffc174] truncate mt-0.5">
                    {story.title}
                  </div>
                  <div className="text-xs text-[#b8b0a4] truncate">
                    By {story.author.name} — {story.description}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#ffc174] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
