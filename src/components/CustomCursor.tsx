import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'story'>('default');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(hasFinePointer && !prefersReduced && window.innerWidth >= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-cursor="story"]')) {
        setCursorState('story');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('[role="button"]')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[100] transition-transform duration-75 ease-out hidden lg:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 flex items-center justify-center ${
          cursorState === 'story'
            ? 'w-16 h-16 bg-[#f59e0b]/20 border border-[#ffc174] backdrop-blur-xs'
            : cursorState === 'hover'
            ? 'w-8 h-8 bg-[#ffc174]/15 border border-[#ffc174]/70'
            : 'w-3.5 h-3.5 bg-[#ffc174]/80 shadow-[0_0_12px_rgba(245,158,11,0.7)]'
        }`}
      >
        {cursorState === 'story' && (
          <span className="text-[9px] font-semibold tracking-widest uppercase text-[#ffc174]">
            Enter
          </span>
        )}
      </div>
    </div>
  );
};
