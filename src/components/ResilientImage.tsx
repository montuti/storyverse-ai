import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#121318] via-[#1e1f2b] to-[#2a1d15] flex flex-col items-center justify-center p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.35), transparent 60%), radial-gradient(circle at 75% 70%, rgba(56, 189, 248, 0.25), transparent 60%)',
          }}
        />
        <Sparkles className="w-8 h-8 text-[#ffc174] mb-2 opacity-80 relative z-10" />
        {fallbackTitle && (
          <span className="font-serif-editorial text-sm text-[#e3e1e9]/90 tracking-wide relative z-10">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
