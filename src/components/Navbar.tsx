import React, { useState } from 'react';
import {
  Search,
  Bookmark,
  Compass,
  Sun,
  Moon,
  User,
  LogOut,
  Sparkles,
  Home,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onQuickFilterFormat?: (formatOrCat: string) => void;
  onOpenSearch: () => void;
  onSurpriseMe: () => void;
  onToggleSavedDrawer: () => void;
  onOpenJourneyModal: () => void;
  onToggleStoryGuide?: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onQuickFilterFormat,
  onOpenSearch,
  onToggleSavedDrawer,
  onOpenJourneyModal,
  onToggleStoryGuide,
  savedCount,
}) => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme, reducedMotion, setReducedMotion } = useTheme();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Section 19: Post-Login Navigation Links
  const navItems = [
    { id: 'featured', label: 'Discover', type: 'scroll' },
    { id: 'discover', label: 'Stories', type: 'scroll' },
    { id: 'trending', label: 'Trending', type: 'scroll' },
    { id: 'discover', label: 'Categories', type: 'filter', filter: 'All' },
    { id: 'discover', label: 'Cinematic', type: 'filter', filter: 'Cinematic Video' },
    { id: 'educational', label: 'Education', type: 'scroll' },
    { id: 'discover', label: 'Audio', type: 'filter', filter: 'Audio Drama' },
    { id: 'formats', label: 'Video', type: 'scroll' },
    { id: '3d-and-ai', label: 'AI Stories', type: 'scroll' },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.type === 'filter' && item.filter && onQuickFilterFormat) {
      onQuickFilterFormat(item.filter);
    }
    onNavigate(item.id);
  };

  return (
    <>
      {/* Desktop & Tablet Editorial Top Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#050507]/90 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="h-16 md:h-20 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: STORYVERSE Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="font-serif-editorial text-2xl tracking-[-0.02em] text-[#f4f2ed] hover:text-[#ffc174] transition-colors font-medium whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#ffc174]" />
            <span>STORYVERSE</span>
          </a>

          {/* Center: Post-Login Navigation Links */}
          <nav
            className="hidden xl:flex items-center gap-5"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id && item.type === 'scroll';
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`relative py-1 text-[11px] uppercase tracking-[0.15em] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#ffc174] font-semibold'
                      : 'text-[#b8b0a4] hover:text-[#f4f2ed]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#ffc174]" />
                  )}
                </button>
              );
            })}
            <button
              type="button"
              onClick={onToggleSavedDrawer}
              className="py-1 text-[11px] uppercase tracking-[0.15em] text-[#b8b0a4] hover:text-[#ffc174] transition-colors whitespace-nowrap cursor-pointer"
            >
              Saved ({savedCount})
            </button>
          </nav>

          {/* Right Side: Search, Theme Toggle, Story Guide, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs text-[#b8b0a4] hover:text-[#f4f2ed] border border-white/15 hover:border-[#ffc174] px-3 py-1.5 transition-colors cursor-pointer whitespace-nowrap"
              aria-label="Search Storyverse (Command+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#ffc174]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline text-[10px] font-mono-tabular text-[#b8b0a4]/80">
                ⌘K
              </kbd>
            </button>

            {/* Global Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 border border-white/15 hover:border-[#ffc174] text-[#f4f2ed] transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffc174]" />
              ) : (
                <Moon className="w-4 h-4 text-[#ffc174]" />
              )}
            </button>

            {/* Story Guide Trigger */}
            {onToggleStoryGuide && (
              <button
                type="button"
                onClick={onToggleStoryGuide}
                className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono-tabular uppercase tracking-wider text-[#ffc174] border border-[#ffc174]/40 hover:border-[#ffc174] px-3 py-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Story Guide</span>
              </button>
            )}

            {/* User Profile & Sign Out Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((o) => !o)}
                className="flex items-center gap-2 border border-white/15 hover:border-[#ffc174] px-3 py-1.5 text-xs font-mono-tabular text-[#f4f2ed] cursor-pointer"
                aria-label="Open explorer profile menu"
              >
                <User className="w-3.5 h-3.5 text-[#7bd0ff]" />
                <span className="hidden md:inline max-w-[110px] truncate">
                  {user?.name || 'Explorer'}
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#090a0f] border border-white/20 shadow-2xl p-4 space-y-3 z-50">
                  <div className="pb-2 border-b border-white/10">
                    <div className="font-serif-editorial text-lg text-[#f4f2ed]">
                      {user?.name}
                    </div>
                    <div className="text-[11px] font-mono-tabular text-[#b8b0a4] truncate">
                      {user?.email}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      onOpenJourneyModal();
                    }}
                    className="w-full text-left text-xs font-mono-tabular uppercase tracking-wider text-[#7bd0ff] hover:text-[#ffc174] py-1.5 flex items-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>My Story Journey &amp; Stats</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className="w-full text-left text-xs font-mono-tabular uppercase tracking-wider text-[#b8b0a4] hover:text-[#f4f2ed] py-1.5 flex items-center justify-between cursor-pointer"
                  >
                    <span>Reduced Motion</span>
                    <span className="text-[#ffc174]">
                      {reducedMotion ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full text-left text-xs font-mono-tabular uppercase tracking-wider text-[#ffb4ab] hover:underline pt-2 border-t border-white/10 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Storyverse</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section 19: Mobile Bottom Navigation (Home, Explore, Create, Saved, Profile) */}
      <nav
        aria-label="Mobile Navigation"
        className="xl:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-[#050507]/95 backdrop-blur-2xl border-t border-white/15 px-3 flex items-center justify-around"
      >
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] text-[10px] font-mono-tabular uppercase tracking-wider cursor-pointer ${
            activeSection === 'hero' ? 'text-[#ffc174]' : 'text-[#b8b0a4]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('discover')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] text-[10px] font-mono-tabular uppercase tracking-wider cursor-pointer ${
            activeSection === 'discover' ? 'text-[#ffc174]' : 'text-[#b8b0a4]'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Explore</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('3d-and-ai')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] text-[10px] font-mono-tabular uppercase tracking-wider cursor-pointer ${
            activeSection === '3d-and-ai' ? 'text-[#ffc174]' : 'text-[#b8b0a4]'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-[#ffc174]" />
          <span>Create</span>
        </button>

        <button
          type="button"
          onClick={onToggleSavedDrawer}
          className="flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] text-[10px] font-mono-tabular uppercase tracking-wider text-[#b8b0a4] cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-[#ffc174]" />
          <span>Saved ({savedCount})</span>
        </button>

        <button
          type="button"
          onClick={onOpenJourneyModal}
          className="flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] text-[10px] font-mono-tabular uppercase tracking-wider text-[#b8b0a4] cursor-pointer"
        >
          <User className="w-4 h-4 text-[#7bd0ff]" />
          <span>Profile</span>
        </button>
      </nav>
    </>
  );
};
