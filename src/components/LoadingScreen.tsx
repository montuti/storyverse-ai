import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadingOut(true);
          setTimeout(onComplete, 260);
          return 100;
        }
        return prev + 34;
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[90] bg-[#050507] flex flex-col items-center justify-center px-6 transition-opacity duration-300 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center max-w-md w-full text-center">
        <div className="text-[10px] font-mono-tabular uppercase tracking-[0.28em] text-[#ffc174] mb-4">
          ISSUE NO. 09 · INTERACTIVE ARCHIVE
        </div>
        <h1 className="font-serif-editorial text-5xl md:text-6xl tracking-tight text-[#f4f2ed] font-normal mb-3">
          Storyverse
        </h1>
        <p className="font-serif-editorial italic text-base text-[#b8b0a4] mb-8">
          “Don&apos;t just read the story. Enter it.”
        </p>
        <div className="w-48 h-[1px] bg-white/15 overflow-hidden mb-6">
          <div
            className="h-full bg-[#ffc174] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          type="button"
          onClick={onComplete}
          className="text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#b8b0a4] hover:text-[#ffc174] transition-colors cursor-pointer"
        >
          Enter Archive Immediately →
        </button>
      </div>
    </div>
  );
};
