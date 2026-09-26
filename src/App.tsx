import React, { useState, useEffect, useCallback } from 'react';
import { ALL_STORIES } from './data/sceneEngine';
import { Story, UserJourneyState } from './types/story';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthGateScreen } from './components/AuthGateScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedStorySpotlight } from './components/FeaturedStorySpotlight';
import { TrendingAndLibrarySection } from './components/TrendingAndLibrarySection';
import { DiscoveryEngine } from './components/DiscoveryEngine';
import { EducationalLabSection } from './components/EducationalLabSection';
import { DataStorySection } from './components/DataStorySection';
import { MultimediaFormatsSection } from './components/MultimediaFormatsSection';
import { ThreeDAndAILabSection } from './components/ThreeDAndAILabSection';
import { ImmersiveReaderModal } from './components/ImmersiveReaderModal';
import { StoryGuideAI } from './components/StoryGuideAI';
import { CommandSearchModal } from './components/CommandSearchModal';
import {
  SavedStoriesDrawer,
  PersonalJourneyModal,
  PolicyModal,
} from './components/SavedAndJourneyDrawers';
import { Footer } from './components/Footer';
import { soundEngine } from './utils/soundEngine';

const STORAGE_KEY = 'storyverse_journey_v2';

const DEFAULT_JOURNEY: UserJourneyState = {
  storiesOpened: ['The Last Light', 'The City Beneath the Ocean'],
  storiesCompleted: [],
  savedStories: [
    'The Last Light',
    'The City Beneath the Ocean',
    'Letters From Mars',
  ],
  likedStories: [],
  bookmarks: [],
  readingPositions: {},
  watchProgress: {
    'The City Beneath the Ocean': { sceneIndex: 1, currentTime: 10 },
  },
  choicesMade: {},
  categoriesExplored: ['Science', 'Environment'],
};

function StoryverseAuthenticatedApp() {
  const { isAuthenticated } = useAuth();
  const [storiesList, setStoriesList] = useState<Story[]>(ALL_STORIES);
  const [activeSection, setActiveSection] = useState('featured');
  const [externalFormatFilter, setExternalFormatFilter] = useState<
    string | null
  >(null);
  const [readerStory, setReaderStory] = useState<Story | null>(null);
  const [guideContextStory, setGuideContextStory] = useState<Story>(
    ALL_STORIES[0]
  );
  const [storyGuideOpen, setStoryGuideOpen] = useState(false);
  const [commandSearchOpen, setCommandSearchOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);
  const [activePolicyTitle, setActivePolicyTitle] = useState<string | null>(
    null
  );
  const [formatTabOverride, setFormatTabOverride] = useState<
    'audio' | 'video' | 'photo' | 'map' | null
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [journey, setJourney] = useState<UserJourneyState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_JOURNEY, ...JSON.parse(raw) };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_JOURNEY;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
    } catch {
      // ignore storage errors
    }
  }, [journey]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  }, []);

  // Global keyboard shortcuts: '/' or 'Ctrl+K' / 'Cmd+K' for Search, 'Escape' to close modals
  useEffect(() => {
    if (!isAuthenticated) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandSearchOpen((prev) => !prev);
      } else if (!isInput && e.key === '/') {
        e.preventDefault();
        setCommandSearchOpen(true);
      } else if (e.key === 'Escape') {
        setCommandSearchOpen(false);
        setSavedDrawerOpen(false);
        setJourneyModalOpen(false);
        setActivePolicyTitle(null);
        if (readerStory) setReaderStory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, readerStory]);

  // Section 1: Mandatory Authentication Gate before accessing any story or trending content
  if (!isAuthenticated) {
    return (
      <>
        <CustomCursor />
        <div className="storyverse-grain" aria-hidden="true" />
        <AuthGateScreen />
      </>
    );
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStory = (story: Story) => {
    soundEngine.playChime('discover');
    setReaderStory(story);
    setGuideContextStory(story);

    setStoriesList((prev) =>
      prev.some((s) => s.id === story.id) ? prev : [story, ...prev]
    );

    setJourney((prev) => ({
      ...prev,
      storiesOpened: [
        story.title,
        ...prev.storiesOpened.filter((t) => t !== story.title),
      ],
      categoriesExplored: prev.categoriesExplored.includes(story.category)
        ? prev.categoriesExplored
        : [...prev.categoriesExplored, story.category],
    }));
  };

  const handleUpdateWatchProgress = (
    storyTitle: string,
    sceneIndex: number,
    currentTime: number
  ) => {
    setJourney((prev) => ({
      ...prev,
      watchProgress: {
        ...(prev.watchProgress || {}),
        [storyTitle]: { sceneIndex, currentTime },
      },
    }));
  };

  const handleToggleBookmark = (title: string) => {
    soundEngine.playChime('bookmark');
    setJourney((prev) => {
      const exists = prev.savedStories.includes(title);
      const nextSaved = exists
        ? prev.savedStories.filter((t) => t !== title)
        : [...prev.savedStories, title];
      showToast(
        exists
          ? `Removed "${title}" from Saved Library`
          : `Saved "${title}" to My Story Library`
      );
      return {
        ...prev,
        savedStories: nextSaved,
      };
    });
  };

  const handleToggleLike = (title: string) => {
    setJourney((prev) => {
      const exists = prev.likedStories.includes(title);
      return {
        ...prev,
        likedStories: exists
          ? prev.likedStories.filter((t) => t !== title)
          : [...prev.likedStories, title],
      };
    });
  };

  const handleRecordChoice = (storyTitle: string, choiceId: string) => {
    setJourney((prev) => ({
      ...prev,
      choicesMade: {
        ...prev.choicesMade,
        [storyTitle]: choiceId,
      },
    }));
    showToast(`Timeline branch "${choiceId.toUpperCase()}" recorded`);
  };

  const handleCompleteStory = (storyTitle: string) => {
    setJourney((prev) => {
      if (prev.storiesCompleted.includes(storyTitle)) return prev;
      return {
        ...prev,
        storiesCompleted: [...prev.storiesCompleted, storyTitle],
      };
    });
  };

  const handleSurpriseMe = () => {
    const randomStory =
      storiesList[Math.floor(Math.random() * storiesList.length)];
    handleOpenStory(randomStory);
  };

  const featuredSpotlightStory = storiesList[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-[#f4f2ed] selection:bg-[#ffc174] selection:text-[#1a0f00]">
      <div className="storyverse-grain" aria-hidden="true" />
      <CustomCursor />

      {/* Post-Authentication Navigation Bar & Mobile Bottom Dock */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onQuickFilterFormat={(fmt) => setExternalFormatFilter(fmt)}
        onOpenSearch={() => setCommandSearchOpen(true)}
        onSurpriseMe={handleSurpriseMe}
        onToggleSavedDrawer={() => setSavedDrawerOpen((o) => !o)}
        onOpenJourneyModal={() => setJourneyModalOpen(true)}
        onToggleStoryGuide={() => setStoryGuideOpen((o) => !o)}
        savedCount={journey.savedStories.length}
      />

      {/* Main Authenticated Content Stream */}
      <main className="w-full pt-16 md:pt-20 flex-1 relative overflow-hidden">
        {/* 1. Full-Screen Cinematic Hero & Editorial Manifesto */}
        <HeroSection
          onExploreStories={() => scrollToSection('discover')}
          onStartRandomStory={handleSurpriseMe}
          onEnterFeatured={() => handleOpenStory(featuredSpotlightStory)}
        />

        {/* 2. Trending Now Horizontal Cards & My Story Library (Continue Watching / Saved / Recent) */}
        <TrendingAndLibrarySection
          stories={storiesList}
          journey={journey}
          onOpenStory={handleOpenStory}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* 3. Masterwork Featured Story Spotlight ("The Last Light" + Story DNA) */}
        <FeaturedStorySpotlight
          story={featuredSpotlightStory}
          isSaved={journey.savedStories.includes(featuredSpotlightStory.title)}
          onOpenStory={handleOpenStory}
          onToggleBookmark={handleToggleBookmark}
          onOpenVideoExperience={() => handleOpenStory(storiesList[1] || featuredSpotlightStory)}
          onOpenMapExperience={() => {
            setFormatTabOverride('map');
            scrollToSection('formats');
          }}
        />

        {/* 4. Multi-Dimensional Story Library & Discovery Engine (21 Distinct Worlds) */}
        <DiscoveryEngine
          stories={storiesList}
          savedStories={journey.savedStories}
          likedStories={journey.likedStories}
          externalFormatFilter={externalFormatFilter}
          onOpenStory={handleOpenStory}
          onToggleBookmark={handleToggleBookmark}
          onToggleLike={handleToggleLike}
        />

        {/* 5. Multi-Modal Storytelling Formats (Cartographic Map, Spatial Audio, Cinema, Photo Folio) */}
        <MultimediaFormatsSection
          onOpenStory={handleOpenStory}
          activeTabOverride={formatTabOverride}
        />

        {/* 6. Educational Storytelling Mode ("How Artificial Intelligence Learns") */}
        <EducationalLabSection onOpenStory={handleOpenStory} />

        {/* 7. Data Storytelling Interactive Telemetry Lab ("The City That Never Sleeps") */}
        <DataStorySection onOpenStory={handleOpenStory} />

        {/* 8. 3D Volumetric Artifact Viewport & AI Story Synthesis Lab */}
        <ThreeDAndAILabSection onOpenGeneratedStory={handleOpenStory} />
      </main>

      {/* Editorial Colophon Footer */}
      <Footer
        onNavigateFormat={(tab) => {
          setFormatTabOverride(tab);
          scrollToSection('formats');
        }}
        onNavigateSection={scrollToSection}
        onOpenPolicy={(title) => setActivePolicyTitle(title)}
      />

      {/* Cinematic Story Detail Page & Synchronized Video/Voice/Text/Scene Player */}
      <ImmersiveReaderModal
        story={readerStory}
        allStories={storiesList}
        isSaved={
          readerStory
            ? journey.savedStories.includes(readerStory.title)
            : false
        }
        savedChoiceId={
          readerStory ? journey.choicesMade[readerStory.title] : undefined
        }
        onClose={() => setReaderStory(null)}
        onToggleBookmark={handleToggleBookmark}
        onRecordChoice={handleRecordChoice}
        onCompleteStory={handleCompleteStory}
        onUpdateWatchProgress={handleUpdateWatchProgress}
        onSelectRecommendedStory={(rec) => handleOpenStory(rec)}
      />

      {/* Floating Story Guide AI Assistant */}
      <StoryGuideAI
        activeStory={guideContextStory}
        externalOpen={storyGuideOpen}
        onExternalOpenChange={setStoryGuideOpen}
      />

      {/* Command+K / '/' Search Modal */}
      <CommandSearchModal
        isOpen={commandSearchOpen}
        stories={storiesList}
        onClose={() => setCommandSearchOpen(false)}
        onSelectStory={handleOpenStory}
      />

      {/* Saved Stories Slide-Over Drawer */}
      <SavedStoriesDrawer
        isOpen={savedDrawerOpen}
        savedTitles={journey.savedStories}
        stories={storiesList}
        onClose={() => setSavedDrawerOpen(false)}
        onOpenStory={handleOpenStory}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => {
          setJourney((prev) => ({ ...prev, savedStories: [] }));
          showToast('Cleared all saved bookmarks');
        }}
      />

      {/* Personal Story Journey Modal */}
      <PersonalJourneyModal
        isOpen={journeyModalOpen}
        journey={journey}
        stories={storiesList}
        onClose={() => setJourneyModalOpen(false)}
        onOpenStory={handleOpenStory}
      />

      {/* Policy / Editorial Protocols Modal */}
      <PolicyModal
        policyTitle={activePolicyTitle}
        onClose={() => setActivePolicyTitle(null)}
      />

      {/* Toast Confirmation Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 xl:bottom-6 left-5 md:left-8 z-50 bg-[#090a0f] border border-[#ffc174] text-[#f4f2ed] px-4 py-2.5 shadow-2xl text-xs font-mono-tabular uppercase tracking-wider flex items-center gap-2.5"
        >
          <span className="w-2 h-2 bg-[#ffc174]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StoryverseAuthenticatedApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
