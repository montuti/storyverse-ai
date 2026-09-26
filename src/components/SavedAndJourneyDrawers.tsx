import React from 'react';
import {
  Bookmark,
  X,
  Trash2,
  Compass,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { Story, UserJourneyState } from '../types/story';

interface SavedStoriesDrawerProps {
  isOpen: boolean;
  savedTitles: string[];
  stories: Story[];
  onClose: () => void;
  onOpenStory: (story: Story) => void;
  onRemoveBookmark: (title: string) => void;
  onClearAll: () => void;
}

export const SavedStoriesDrawer: React.FC<SavedStoriesDrawerProps> = ({
  isOpen,
  savedTitles,
  stories,
  onClose,
  onOpenStory,
  onRemoveBookmark,
  onClearAll,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#090a0f]/98 backdrop-blur-2xl shadow-2xl border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
          <div>
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
              PERSONAL CURATION
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#f4f2ed]">
              Saved Archive ({savedTitles.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
            aria-label="Close saved stories drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#b8b0a4] mb-6 leading-relaxed">
          Narratives bookmarked across your expedition. Persisted locally in your browser.
        </p>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] max-h-[65vh] overflow-y-auto">
          {savedTitles.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#b8b0a4]">
              No bookmarked narratives yet. Select Save on any story to archive it here.
            </div>
          ) : (
            savedTitles.map((title, idx) => {
              const storyObj = stories.find((s) => s.title === title);
              return (
                <div
                  key={title}
                  className="py-4 flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (storyObj) {
                        onOpenStory(storyObj);
                        onClose();
                      }
                    }}
                    className="text-left flex-1 cursor-pointer group"
                  >
                    <div className="text-[10px] font-mono-tabular text-[#7bd0ff] uppercase tracking-wider">
                      0{idx + 1} · {storyObj?.category || 'Archive'}
                    </div>
                    <div className="font-serif-editorial text-xl text-[#f4f2ed] group-hover:text-[#ffc174] transition-colors">
                      {title}
                    </div>
                    <div className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#ffc174] mt-1 flex items-center gap-1">
                      <span>Enter Folio</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(title)}
                    className="text-[#b8b0a4] hover:text-[#ffb4ab] p-2 cursor-pointer"
                    aria-label={`Remove ${title} from saved`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {savedTitles.length > 0 && (
        <div className="pt-5 border-t border-white/10">
          <button
            type="button"
            onClick={onClearAll}
            className="w-full border border-white/15 hover:border-[#ffb4ab] text-[#b8b0a4] hover:text-[#ffb4ab] text-xs font-mono-tabular uppercase tracking-[0.16em] py-3 transition-colors cursor-pointer"
          >
            Clear Saved Archive
          </button>
        </div>
      )}
    </div>
  );
};

interface PersonalJourneyModalProps {
  isOpen: boolean;
  journey: UserJourneyState;
  stories: Story[];
  onClose: () => void;
  onOpenStory: (story: Story) => void;
}

export const PersonalJourneyModal: React.FC<PersonalJourneyModalProps> = ({
  isOpen,
  journey,
  stories,
  onClose,
  onOpenStory,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050507]/90 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Your Story Journey"
    >
      <div
        className="w-full max-w-3xl bg-[#090a0f] border border-white/15 shadow-2xl p-6 sm:p-10 space-y-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#ffc174]" />
            <div>
              <span className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
                PERSONAL TELEMETRY LEDGER · LOCALSTORAGE SYNCED
              </span>
              <h3 className="font-serif-editorial text-3xl text-[#f4f2ed]">
                Your Story Journey
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 border border-white/15 text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Architectural Hairline Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="p-4">
            <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
              Worlds Entered
            </div>
            <div className="font-serif-editorial text-4xl text-[#ffc174] font-mono-tabular mt-1">
              {journey.storiesOpened.length}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
              Completed
            </div>
            <div className="font-serif-editorial text-4xl text-[#7bd0ff] font-mono-tabular mt-1">
              {journey.storiesCompleted.length}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
              Saved Archive
            </div>
            <div className="font-serif-editorial text-4xl text-[#d0bcff] font-mono-tabular mt-1">
              {journey.savedStories.length}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#b8b0a4]">
              Domains Explored
            </div>
            <div className="font-serif-editorial text-4xl text-[#f4f2ed] font-mono-tabular mt-1">
              {journey.categoriesExplored.length}
            </div>
          </div>
        </div>

        {/* Recently Opened & Branch Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#ffc174] pb-2 border-b border-white/10 mb-3">
              RECENTLY EXPLORED WORLDS
            </div>
            {journey.storiesOpened.length === 0 ? (
              <p className="text-xs text-[#b8b0a4]">
                Open any story to begin recording your personal reading history.
              </p>
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {journey.storiesOpened.map((title) => {
                  const found = stories.find((s) => s.title === title);
                  const isDone = journey.storiesCompleted.includes(title);
                  return (
                    <div
                      key={title}
                      className="flex items-center justify-between text-xs py-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (found) {
                            onOpenStory(found);
                            onClose();
                          }
                        }}
                        className="font-serif-editorial text-lg text-[#f4f2ed] hover:text-[#ffc174] truncate cursor-pointer"
                      >
                        {title}
                      </button>
                      {isDone ? (
                        <span className="text-[10px] font-mono-tabular uppercase text-[#7bd0ff] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono-tabular uppercase text-[#b8b0a4]">
                          In Progress
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#7bd0ff] pb-2 border-b border-white/10 mb-3">
              TIMELINE BRANCHES RECORDED
            </div>
            {Object.keys(journey.choicesMade).length === 0 ? (
              <p className="text-xs text-[#b8b0a4] leading-relaxed">
                Make an interactive choice inside any story to record your timeline branch here.
              </p>
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {Object.entries(journey.choicesMade).map(([storyTitle, choiceId]) => (
                  <div
                    key={storyTitle}
                    className="text-xs py-2.5 flex items-center justify-between"
                  >
                    <span className="font-serif-editorial text-lg text-[#f4f2ed] truncate">
                      {storyTitle}
                    </span>
                    <span className="font-mono-tabular text-[11px] text-[#ffc174] uppercase">
                      PATH: {choiceId}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PolicyModalProps {
  policyTitle: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  policyTitle,
  onClose,
}) => {
  if (!policyTitle) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050507]/90 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg bg-[#090a0f] border border-white/15 p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#ffc174]">
              STORYVERSE CHARTER
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#f4f2ed]">
              {policyTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#b8b0a4] hover:text-[#f4f2ed] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-[#b8b0a4] leading-relaxed">
          Storyverse operates with local-first privacy and transparent editorial provenance. Your reading progress, bookmarks, and branching narrative choices are stored locally in your browser&apos;s storage without external tracking.
        </p>
        <p className="text-xs text-[#b8b0a4]/80 leading-relaxed">
          All interactive telemetry datasets and AI Story Guide responses are grounded strictly in verified story context layers.
        </p>
        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#ffc174] text-[#1a0f00] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
